import React from "react";
import PageHeader from "../../_component/PageHeader";
import ProductForm from "../_component/ProductForm";

const newProductPage = () => {
  return (
    <div>
      <PageHeader> Add Product</PageHeader>
      <ProductForm />
    </div>
  );
};

export default newProductPage;
