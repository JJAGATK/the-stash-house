import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stash Host Registry | Staff Portal",
  description: "Internal table reservation & host desk management console for The Stash House Haridwar.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
