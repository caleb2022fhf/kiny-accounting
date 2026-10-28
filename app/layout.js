import './globals.css';

export const metadata = {
  title: 'Kinyarwanda Accounting System',
  description: 'Simple accounting & deposit web app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="rw">
      <body className="bg-gray-100 font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}