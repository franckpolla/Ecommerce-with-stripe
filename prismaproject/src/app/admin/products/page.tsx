import React from "react";
import PageHeader from "../_component/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function productTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0">
              <span className="sr-only"> Available for purchase</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Order</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

const page = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/product/new">Add product</Link>
        </Button>
      </div>
      {productTable()}
    </>
  );
};

export default page;
