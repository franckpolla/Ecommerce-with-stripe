"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

export const Nav = ({ children }: { chidren: ReactNode }) => {
  return (
    <nav className="bg-primary text-primary foregrouund flex justify-center px-4">
      {children}
    </nav>
  );
};

export function NavLink(props: Omit<ComponentProps<typeofLink>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground text-white focus-visible:bg-secondary focus-visible::text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
}
