import "./globals.css";

export const metadata = {
  title: "NexaBank — Secure Online Banking",
  description: "NexaBank — Modern, secure banking for everyone. Manage accounts, transfers, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
