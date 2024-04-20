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
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formater";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export async function productTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });
  if (products.length === 0) return <div>No Products Found</div>;

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
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailableForPurchase ? (
                  <>
                    <span className="sr-only"> Available </span>
                    <CheckCircle2 />
                  </>
                ) : (
                  <>
                    <span className="sr-only"> Unavailable </span>
                    <XCircle />
                  </>
                )}
              </TableCell>
              <TableCell>{product.name} </TableCell>
              <TableCell>
                {formatCurrency(product.priceInCents / 100)}{" "}
              </TableCell>
              <TableCell>{formatNumber(product._count.orders)}</TableCell>
              <TableCell></TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <a download href={`admin/products/${product.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableRow>
          ))}
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
