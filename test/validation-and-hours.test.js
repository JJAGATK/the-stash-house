const test = require('node:test');
const assert = require('node:assert');
const { z } = require('zod');

// 1. Test Reservation Schema Validation
const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  phone: z.string().min(8, "Please enter a valid phone number").max(20),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  date: z.string().min(8, "Date is required"),
  time: z.string().min(3, "Time is required"),
  guests: z.string().min(1, "Please select party size"),
  occasion: z.string().optional().default("Dinner Gathering"),
  notes: z.string().max(500).optional().default(""),
  honeypot: z.string().optional(),
});

test('Valid reservation passes Zod schema', () => {
  const validData = {
    name: 'Kabir Mehta',
    phone: '+91 98765 43210',
    email: 'kabir@example.com',
    date: '2026-11-20',
    time: '19:30',
    guests: '4',
    occasion: 'Birthday Celebration',
    notes: 'Corner booth requested'
  };
  const result = reservationSchema.safeParse(validData);
  assert.strictEqual(result.success, true);
  assert.strictEqual(result.data.name, 'Kabir Mehta');
  assert.strictEqual(result.data.guests, '4');
});

test('Short name fails validation', () => {
  const invalidData = {
    name: 'K',
    phone: '9876543210',
    date: '2026-11-20',
    time: '20:00',
    guests: '2'
  };
  const result = reservationSchema.safeParse(invalidData);
  assert.strictEqual(result.success, false);
});

test('Invalid email fails validation', () => {
  const invalidData = {
    name: 'Karan Singh',
    phone: '9876543210',
    email: 'not-an-email',
    date: '2026-11-20',
    time: '20:00',
    guests: '2'
  };
  const result = reservationSchema.safeParse(invalidData);
  assert.strictEqual(result.success, false);
});

// 2. Test Open-Now Logic in Asia/Kolkata
function checkVenueOpen(hour, minute) {
  const openMinutes = 11 * 60; // 11:00 AM = 660 mins
  const closeMinutes = 23 * 60 + 30; // 11:30 PM = 1410 mins
  const currentMinutes = hour * 60 + minute;
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

test('Venue is open at 11:00 AM', () => {
  assert.strictEqual(checkVenueOpen(11, 0), true);
});

test('Venue is open at 8:45 PM (20:45)', () => {
  assert.strictEqual(checkVenueOpen(20, 45), true);
});

test('Venue is open at 11:29 PM (23:29)', () => {
  assert.strictEqual(checkVenueOpen(23, 29), true);
});

test('Venue is closed at 11:31 PM (23:31)', () => {
  assert.strictEqual(checkVenueOpen(23, 31), false);
});

test('Venue is closed at 8:00 AM (08:00)', () => {
  assert.strictEqual(checkVenueOpen(8, 0), false);
});
