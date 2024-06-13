import { useState } from "react";
import useOrders from "../../hooks/useOrders.hook";
import styles from "../employees/EmployeesPage.module.css";
import ActionButton, {
  Action,
} from "../../components/action-button/ActionButton";
import { Order } from "../../types/order.type";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import useEmployees from "../../hooks/useEmployees.hook";
import { Select } from "../../components/select/Select";

function OrdersPage() {
  const { orders, deleteOrder, addOrder, editOrder } = useOrders();
  const { employees } = useEmployees();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditModalOpen = (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleDeleteModalOpen = (order: Order) => () => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const order: Order = {
      name: formData.get("name") as string,
      orderDate: formData.get("orderDate") as string,
      company: formData.get("company") as string,
      price: parseInt(formData.get("price") as string),
      employee: {
        _id: formData.get("employee") as string,
      },
    };

    addOrder(order);
    handleAddModalClose();
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const order: Order = {
      _id: selectedOrder?._id,
      name: formData.get("name") as string,
      orderDate: formData.get("orderDate") as string,
      company: formData.get("company") as string,
      price: parseInt(formData.get("price") as string),
      employee: {
        _id: formData.get("employee") as string,
      },
    };

    editOrder(order);
    handleEditModalClose();
  };

  const handleDelete = () => {
    if (selectedOrder) {
      deleteOrder(selectedOrder._id!);
    }
    handleDeleteModalClose();
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Orders</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Order Date</th>
              <th>Company</th>
              <th>Price</th>
              <th>Employee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.company}</td>
                <td>{order.price}</td>
                <td>{order.employee?.name}</td>
                <td>
                  <ActionButton
                    action={Action.EDIT}
                    onClick={() => handleEditModalOpen(order)}
                  />
                  <ActionButton
                    action={Action.DELETE}
                    onClick={handleDeleteModalOpen(order)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Button onClick={handleAddModalOpen}>Add Order</Button>
        </div>
      </div>
      {(isEditModalOpen && selectedOrder) && (
        <Modal onClose={handleEditModalClose}>
          <div className={styles.modal}>
            <h2 className={styles.title}>Edit Order</h2>
            <form onSubmit={handleEditSubmit}>
              <Input
                type="text"
                name="name"
                label="Name"
                value={selectedOrder.name}
              />
              <Input
                type="date"
                name="orderDate"
                label="Order Date"
                value={new Date(selectedOrder.orderDate).toISOString().split("T")[0]}
              />
              <Input
                type="text"
                name="company"
                label="Company"
                value={selectedOrder.company}
              />
              <Input
                type="number"
                name="price"
                label="Price"
                value={selectedOrder.price}
              />
              <Select
                name="employee"
                label="Employee"
              >
                {employees.map((employee) => (
                  <option
                    key={employee._id}
                    value={employee._id}
                  >
                    {employee.name}
                  </option>
                ))}
              </Select>
              <Button type="submit">Edit Order</Button>
            </form>
          </div>
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal onClose={handleDeleteModalClose}>
          <div className={styles.modal}>
            <h2 className={styles.title}>Delete Order</h2>
            <p>Are you sure you want to delete this order?</p>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </Modal>
      )}
      {isAddModalOpen && (
        <Modal onClose={handleAddModalClose}>
          <div className={styles.modal}>
            <h2 className={styles.title}>Add Order</h2>
            <form onSubmit={handleAddSubmit}>
              <Input
                type="text"
                name="name"
                label="Name"
              />
              <Input
                type="date"
                name="orderDate"
                label="Order Date"
              />
              <Input
                type="text"
                name="company"
                label="Company"
              />
              <Input
                type="number"
                name="price"
                label="Price"
              />
              <Select
                name="employee"
                label="Employee"
              >
                {employees.map((employee) => (
                  <option
                    key={employee._id}
                    value={employee._id}
                  >
                    {employee.name}
                  </option>
                ))}
              </Select>
              <Button type="submit">Add Order</Button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default OrdersPage;
