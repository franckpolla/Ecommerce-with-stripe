import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formater";
import React from "react";

async function getSales() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCent: true },
    _count: true,
  });
  await wait(2000);
  return {
    totalAmount: (data._sum.pricePaidInCent || 0) / 100,
    amountOfOrders: data._count,
  };
}

async function getUserData() {
  const userCount = await db.user.count();
  const avgOrderValue = await db.order.aggregate({
    _sum: { pricePaidInCent: true },
  });

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (avgOrderValue._sum.pricePaidInCent || 0) / userCount / 100,
  };
}
async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return { activeCount, inactiveCount };
}

const AdminDashboard = async () => {
  const salesData = await getSales();
  const userData = await getUserData();
  const productData = await getProductData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardComponent
        title="Sales"
        description={salesData.amountOfOrders}
        content={`${formatCurrency(salesData.totalAmount)} Orders`}
      />
      <CardComponent
        title="Customer"
        content={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        footer={formatNumber(userData.userCount)}
        description={0}
      />
      <CardComponent
        title="Active Products"
        content={`${formatNumber(productData.inactiveCount)}Inactive`}
        footer={formatNumber(productData.activeCount)}
        description={0}
      />
    </div>
  );
};

export default AdminDashboard;

type card = {
  title: string;
  description: number;
  content: string;
  footer?: string;
};
export function CardComponent(card: card) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{card.title}</CardTitle>
          <CardDescription>{card.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{card.content}</p>
        </CardContent>
      </Card>
    </>
  );
}

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
