"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Users, 
  Calendar, 
  Clock, 
  Phone, 
  MessageSquare, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock3, 
  AlertCircle, 
  XCircle, 
  Download, 
  RefreshCw, 
  Plus, 
  LogOut, 
  MapPin, 
  Sparkles, 
  Utensils, 
  Wine, 
  ChevronDown,
  X,
  ExternalLink,
  Table as TableIcon
} from "lucide-react";

interface Reservation {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes?: string;
  status: "pending" | "confirmed" | "seated" | "completed" | "cancelled";
  table?: string;
}

interface Metrics {
  totalBookings: number;
  todayBookingsCount: number;
  totalCoversToday: number;
  pendingCount: number;
  confirmedCount: number;
  seatedCount: number;
  completedCount: number;
  cancelledCount: number;
}

const TABLE_OPTIONS = [
  "Unassigned",
  "Booth 1 (Velvet Alcove)",
  "Booth 2 (Intimate)",
  "Booth 3 (Intimate)",
  "Table 4 (Chandelier Hall)",
  "Table 5 (Main Lounge)",
  "Table 7 (Chandelier Hall)",
  "Private Dining Suite (10-60 Pax)",
  "Bar Vault High-Top 1",
  "Bar Vault High-Top 2",
];

export default function AdminReservationsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all"); // "all", "today", "tomorrow"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Reservation Form State
  const [newRes, setNewRes] = useState({
    name: "",
    phone: "",
    email: "",
    date: new Date().toISOString().split("T")[0],
    time: "20:00",
    guests: "2",
    occasion: "Dinner Gathering",
    notes: "",
    table: "Booth 1 (Velvet Alcove)",
    status: "confirmed" as const,
  });

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Fetch reservations from API
  const fetchReservations = useCallback(async (keyToUse: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/reservations", {
        headers: {
          Authorization: `Bearer ${keyToUse}`,
          "x-admin-key": keyToUse,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem("stash_admin_key");
          setAuthError("Session expired or invalid passcode.");
        }
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setReservations(data.reservations || []);
        setMetrics(data.metrics || null);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Failed to load reservations:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Check saved session on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("stash_admin_key");
    if (savedKey) {
      setAdminKey(savedKey);
      fetchReservations(savedKey);
    }
  }, [fetchReservations]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = passcode.trim();
    if (cleanKey === "STASH2026" || cleanKey === "85990" || cleanKey === "stash-admin-key-2026") {
      setAdminKey(cleanKey);
      localStorage.setItem("stash_admin_key", cleanKey);
      setAuthError("");
      fetchReservations(cleanKey);
    } else {
      setAuthError("Incorrect staff passcode. Try STASH2026 or 85990.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("stash_admin_key");
    setIsAuthenticated(false);
    setAdminKey("");
    setPasscode("");
  };

  // Update Status or Table
  const handleUpdate = async (id: string, updates: Partial<Reservation>) => {
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ id, ...updates }),
      });

      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
        );
        setActionMessage(`Updated #${id.slice(-6)}`);
        setTimeout(() => setActionMessage(""), 3000);
        // Refresh metrics
        fetchReservations(adminKey);
      }
    } catch (err) {
      console.error("Error updating reservation:", err);
    }
  };

  // Create Manual Walk-in / Phone Reservation
  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(newRes),
      });

      if (res.ok) {
        setIsAddModalOpen(false);
        setNewRes({
          name: "",
          phone: "",
          email: "",
          date: todayStr,
          time: "20:00",
          guests: "2",
          occasion: "Dinner Gathering",
          notes: "",
          table: "Booth 1 (Velvet Alcove)",
          status: "confirmed",
        });
        setActionMessage("New reservation added to run-sheet!");
        setTimeout(() => setActionMessage(""), 4000);
        fetchReservations(adminKey);
      }
    } catch (err) {
      console.error("Failed to create reservation:", err);
    }
  };

  // Delete Reservation
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this reservation from the registry?")) return;
    try {
      const res = await fetch(`/api/admin/reservations?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminKey}`,
          "x-admin-key": adminKey,
        },
      });
      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id));
        setActionMessage(`Deleted #${id.slice(-6)}`);
        setTimeout(() => setActionMessage(""), 3000);
        fetchReservations(adminKey);
      }
    } catch (err) {
      console.error("Failed to delete reservation:", err);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Guest Name", "Phone", "Email", "Date", "Time", "Party Size", "Occasion", "Status", "Table", "Notes"];
    const rows = filteredReservations.map((r) => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      r.phone,
      r.email || "",
      r.date,
      r.time,
      r.guests,
      `"${r.occasion || ""}"`,
      r.status,
      `"${r.table || "Unassigned"}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `stash_reservations_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering Logic
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        r.name.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.id.toLowerCase().includes(q) ||
        (r.occasion && r.occasion.toLowerCase().includes(q));

      // Status
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;

      // Date
      let matchesDate = true;
      if (dateFilter === "today") {
        matchesDate = r.date === todayStr;
      } else if (dateFilter === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomStr = tomorrow.toISOString().split("T")[0];
        matchesDate = r.date === tomStr;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [reservations, searchQuery, statusFilter, dateFilter, todayStr]);

  // If Not Authenticated: Render Secret Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05070B] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-amber-500/10 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#080D18]/95 border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl relative z-10 text-center">
          {/* Logo / Keyhole */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 rounded-full border-2 border-blue-500/40 bg-[#0C1222] flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.4)]">
              <Key className="w-9 h-9 text-[#FFA028]" />
            </div>
          </div>

          <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#38BDF8] block mb-2">
            The Stash House • Host Portal
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mb-2">
            Staff Access Gate
          </h1>
          <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
            Restricted hostess & manager console for table bookings and guest registry.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Staff Passcode..."
                required
                className="w-full px-4 py-3.5 rounded-xl bg-[#0D1527] border border-slate-700 text-white placeholder-slate-500 text-center text-sm font-mono tracking-widest focus:outline-none focus:border-[#FFA028] transition-colors"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#05070B] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,160,40,0.4)] transition-all cursor-pointer"
            >
              Unlock Host Registry
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-[#94A3B8] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authorized Management Only • Haridwar</span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated: Render High-Power Admin Console
  return (
    <div className="min-h-screen bg-[#05070B] text-white flex flex-col overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#070A12]/95 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-blue-500/40 bg-[#0C1222] flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/images/brand/stash-neon-sign.png"
                alt="Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-lg font-bold text-white tracking-tight">
                  The Stash House
                </h1>
                <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-[10px] font-bold uppercase tracking-wider text-[#38BDF8]">
                  Host Desk
                </span>
              </div>
              <span className="text-[11px] text-[#94A3B8] block">
                Pentagon Mall, Haridwar • Reservations Console
              </span>
            </div>
          </div>

          {/* Action Message Alert */}
          {actionMessage && (
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-300 font-semibold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{actionMessage}</span>
            </div>
          )}

          {/* Header Action Tools */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setIsRefreshing(true);
                fetchReservations(adminKey);
              }}
              title="Refresh live feed"
              className="p-2.5 rounded-xl bg-[#0D1527] border border-slate-700 hover:border-[#FFA028] text-[#CBD5E1] hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#FFA028]" : ""}`} />
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2.5 rounded-xl bg-[#0D1527] border border-slate-700 hover:border-[#38BDF8] text-xs font-semibold text-[#CBD5E1] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#05070B] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,160,40,0.35)] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Walk-In / Phone</span>
            </button>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-800/40 hover:bg-rose-900/40 text-rose-300 transition-all cursor-pointer ml-2"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1600px] w-full mx-auto p-4 sm:p-8 space-y-8 flex-grow">
        {/* KPI Summary Cards */}
        {metrics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Today Covers */}
            <div className="p-5 rounded-2xl bg-[#0A0F1D] border border-blue-900/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#38BDF8]">
                  Expected Covers Today
                </span>
                <Users className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
                  {metrics.totalCoversToday}
                </span>
                <span className="text-xs text-[#94A3B8]">
                  guests ({metrics.todayBookingsCount} bookings)
                </span>
              </div>
            </div>

            {/* Pending Confirmations */}
            <div className="p-5 rounded-2xl bg-[#0A0F1D] border border-amber-900/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#FFA028]">
                  Pending Confirmation
                </span>
                <Clock3 className="w-4 h-4 text-[#FFA028]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#FFA028]">
                  {metrics.pendingCount}
                </span>
                <span className="text-xs text-[#94A3B8]">awaiting host call</span>
              </div>
            </div>

            {/* Confirmed Active */}
            <div className="p-5 rounded-2xl bg-[#0A0F1D] border border-emerald-900/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                  Confirmed Bookings
                </span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
                  {metrics.confirmedCount}
                </span>
                <span className="text-xs text-[#94A3B8]">tables secured</span>
              </div>
            </div>

            {/* Seated in House */}
            <div className="p-5 rounded-2xl bg-[#0A0F1D] border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#CBD5E1]">
                  Currently Seated
                </span>
                <Utensils className="w-4 h-4 text-[#FFA028]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
                  {metrics.seatedCount}
                </span>
                <span className="text-xs text-[#94A3B8]">dining now</span>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search Toolbar */}
        <div className="p-4 rounded-2xl bg-[#0A0F1D] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guest, phone, ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1527] border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFA028]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Date Filters */}
            <div className="flex items-center bg-[#0D1527] p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setDateFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  dateFilter === "all" ? "bg-[#FFA028] text-[#05070B]" : "text-[#94A3B8] hover:text-white"
                }`}
              >
                All Dates
              </button>
              <button
                onClick={() => setDateFilter("today")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  dateFilter === "today" ? "bg-[#FFA028] text-[#05070B]" : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setDateFilter("tomorrow")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  dateFilter === "tomorrow" ? "bg-[#FFA028] text-[#05070B]" : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Tomorrow
              </button>
            </div>

            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#0D1527] border border-slate-700 text-xs font-semibold text-[#CBD5E1] focus:outline-none focus:border-[#FFA028]"
            >
              <option value="all">All Statuses ({reservations.length})</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="seated">Seated</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Reservations Registry Table */}
        <div className="rounded-2xl bg-[#0A0F1D] border border-slate-800 shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#FFA028] animate-spin mx-auto" />
              <p className="text-xs text-[#94A3B8]">Retrieving live registry...</p>
            </div>
          ) : filteredReservations.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-base font-serif-luxury font-bold text-white">No matching reservations found</p>
              <p className="text-xs text-[#94A3B8]">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#070B14] text-[#94A3B8] uppercase tracking-wider font-extrabold text-[11px]">
                    <th className="py-4 px-4 sm:px-6">Guest Info</th>
                    <th className="py-4 px-4">Date & Time</th>
                    <th className="py-4 px-4">Covers</th>
                    <th className="py-4 px-4">Occasion & Notes</th>
                    <th className="py-4 px-4">Table Assignment</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4 text-right">Host Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredReservations.map((r) => {
                    const isToday = r.date === todayStr;
                    const whatsappText = encodeURIComponent(
                      `Hello ${r.name}! This is The Stash House host desk confirming your reservation for ${r.guests} guests on ${r.date} at ${r.time}. Table: ${r.table || "Main Lounge"}. First Floor, The Pentagon Mall, Haridwar. Please call us at +91 85990 00029 for directions.`
                    );
                    const cleanPhone = r.phone.replace(/[^0-9]/g, "");

                    return (
                      <tr
                        key={r.id}
                        className={`hover:bg-[#0E1528] transition-colors ${
                          isToday ? "bg-amber-500/[0.02]" : ""
                        }`}
                      >
                        {/* Guest Info */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="space-y-0.5">
                            <span className="font-bold text-white text-sm block">
                              {r.name}
                            </span>
                            <div className="flex items-center gap-2 text-[#94A3B8]">
                              <a
                                href={`tel:${r.phone}`}
                                className="hover:text-[#FFA028] transition-colors"
                              >
                                {r.phone}
                              </a>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">
                              #{r.id.slice(-6)}
                            </span>
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 font-semibold text-white">
                              <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                              <span>{r.date}</span>
                              {isToday && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-[#FFA028] text-[9px] font-bold uppercase">
                                  Today
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-[#94A3B8]">
                              <Clock className="w-3.5 h-3.5 text-[#FFA028]" />
                              <span>{r.time}</span>
                            </div>
                          </div>
                        </td>

                        {/* Covers */}
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-white font-bold text-xs">
                            <Users className="w-3 h-3 text-[#38BDF8]" />
                            {r.guests} Pax
                          </span>
                        </td>

                        {/* Occasion & Notes */}
                        <td className="py-4 px-4 max-w-xs">
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-500/30 text-[10px] uppercase font-bold text-[#FFA028] inline-block">
                              {r.occasion || "Dinner Gathering"}
                            </span>
                            {r.notes && (
                              <p className="text-[11px] text-[#CBD5E1] line-clamp-2 italic">
                                &quot;{r.notes}&quot;
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Table Assignment */}
                        <td className="py-4 px-4">
                          <select
                            value={r.table || "Unassigned"}
                            onChange={(e) => handleUpdate(r.id, { table: e.target.value })}
                            className="px-2.5 py-1.5 rounded-lg bg-[#0D1527] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#FFA028]"
                          >
                            {TABLE_OPTIONS.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-4">
                          <select
                            value={r.status}
                            onChange={(e) =>
                              handleUpdate(r.id, {
                                status: e.target.value as Reservation["status"],
                              })
                            }
                            className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider text-[11px] border focus:outline-none cursor-pointer ${
                              r.status === "confirmed"
                                ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                                : r.status === "pending"
                                ? "bg-amber-950/70 text-amber-300 border-amber-500/40"
                                : r.status === "seated"
                                ? "bg-blue-950/70 text-blue-300 border-blue-500/40"
                                : r.status === "completed"
                                ? "bg-slate-900 text-slate-400 border-slate-700"
                                : "bg-rose-950/70 text-rose-300 border-rose-500/40"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="seated">Seated</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Host Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* WhatsApp Direct */}
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${whatsappText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Send WhatsApp confirmation"
                              className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            {/* Call Guest */}
                            <a
                              href={`tel:${r.phone}`}
                              title="Call Guest directly"
                              className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/40 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-black transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(r.id)}
                              title="Delete booking"
                              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Manual Walk-In / Phone Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#080D18] border border-slate-700 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#FFA028]" />
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Add Host Walk-In / Phone Booking
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReservation} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1">Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newRes.name}
                    onChange={(e) => setNewRes({ ...newRes, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Chauhan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1527] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFA028]"
                  />
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newRes.phone}
                    onChange={(e) => setNewRes({ ...newRes, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1527] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFA028]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newRes.date}
                    onChange={(e) => setNewRes({ ...newRes, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D1527] border border-slate-700 text-white focus:outline-none focus:border-[#FFA028]"
                  />
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={newRes.time}
                    onChange={(e) => setNewRes({ ...newRes, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D1527] border border-slate-700 text-white focus:outline-none focus:border-[#FFA028]"
                  />
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1">Covers (Guests) *</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    required
                    value={newRes.guests}
                    onChange={(e) => setNewRes({ ...newRes, guests: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D1527] border border-slate-700 text-white focus:outline-none focus:border-[#FFA028]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1">Occasion</label>
                  <select
                    value={newRes.occasion}
                    onChange={(e) => setNewRes({ ...newRes, occasion: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D1527] border border-slate-700 text-white focus:outline-none focus:border-[#FFA028]"
                  >
                    <option value="Dinner Gathering">Dinner Gathering</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Birthday Soiree">Birthday Soiree</option>
                    <option value="Corporate Dinner">Corporate Dinner</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Private Suite Party (10-60 Pax)">Private Suite Party (10-60 Pax)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1">Assign Table</label>
                  <select
                    value={newRes.table}
                    onChange={(e) => setNewRes({ ...newRes, table: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D1527] border border-slate-700 text-white focus:outline-none focus:border-[#FFA028]"
                  >
                    {TABLE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-semibold mb-1">Special Notes / Dietary</label>
                <textarea
                  rows={2}
                  value={newRes.notes}
                  onChange={(e) => setNewRes({ ...newRes, notes: e.target.value })}
                  placeholder="e.g. Vegetarian preference, anniversary flower setup..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0D1527] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFA028]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#05070B] font-bold uppercase tracking-wider"
                >
                  Save to Run-Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
