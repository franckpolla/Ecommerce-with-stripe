"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/db/db";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const ImageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().min(1).int().positive(), // Validates positive integer
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: ImageSchema.refine((file) => file.size > 0, "Required"),
});

const addProduct = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  return redirect("/admin/products");
};

export default addProduct;
