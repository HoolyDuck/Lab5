import { Order } from "./order.type";

type Employee = {
  _id?: string;
  name: string;
  surname: string;
  position: string;
  age: number;
  orders?: Order[];
};

export { type Employee };
