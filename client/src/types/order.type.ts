import { Employee } from "./employee.type";

type Order = {
  _id?: string;
  name: string;
  orderDate: string;
  company: string;
  price: number;
  employee?: Partial<Employee>;
};

export { type Order };
