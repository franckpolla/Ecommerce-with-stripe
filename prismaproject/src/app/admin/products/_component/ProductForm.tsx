"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formater";
import React, { useState } from "react";

const ProductForm = () => {
  const [priceIncents, setPriceIncents] = useState<number>();
  return (
    <form className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceUncents">Price In cents</Label>
        <Input
          type=" number"
          id="priceIncents"
          name="priceIncents"
          required
          value={priceIncents}
          onChange={(e) => setPriceIncents(Number(e.target.value) || undefined)}
        />
      </div>
      <div className="text-muted-foreground">
        {formatCurrency((priceIncents || 0) / 100)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" name="description" required />
      </div>
    </form>
  );
};

export default ProductForm;
