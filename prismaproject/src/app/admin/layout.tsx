import { Nav, NavLink } from "@/components/Nav";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav>
        <NavLink href="/admin"> Dashboard</NavLink>
        <NavLink href="/admin/products"> Product</NavLink>
        <NavLink href="/admin/users"> Customer</NavLink>
        <NavLink href="/admin/orders"> Sales</NavLink>
      </Nav>
      <div className="container my-6"> {children}</div>
    </>
  );
}