import { useEffect, useState } from "react";
import { Order } from "../types/order.type";

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const deleteOrder = async (id: string) => {
    await fetch(`http://localhost:3000/orders/${id}`, {
      method: "DELETE",
    });

    setOrders(orders.filter((order) => order._id !== id));
  };

  const addOrder = async (order: Order) => {
    await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    await fetchOrders();
  };

  const editOrder = async (order: Order) => {
    await fetch(`http://localhost:3000/orders/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    await fetchOrders();
  };

  const fetchOrders = async () => {
    const response = await fetch("http://localhost:3000/orders");
    const data = (await response.json()) as Order[];
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    deleteOrder,
    addOrder,
    editOrder,
  };
};

export default useOrders;
