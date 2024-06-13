import styles from "./EmployeesPage.module.css";
import useEmployees from "../../hooks/useEmployees.hook";
import ActionButton, {
  Action,
} from "../../components/action-button/ActionButton";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import Input from "../../components/input/Input";
import Button, { ButtonAppearance } from "../../components/button/Button";
import { Employee } from "../../types/employee.type";

function EmployeesPage() {
  const { employees, deleteEmployee, addEmployee, editEmployee } =
    useEmployees();

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const employee: Employee = {
      _id: selectedEmployee?._id,
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      position: formData.get("position") as string,
      age: parseInt(formData.get("age") as string),
    };

    editEmployee(employee);
    handleEditModalClose();
  };

  const handleDelete = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee._id!);
    }
    handleDeleteModalClose();
  };

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const employee: Employee = {
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      position: formData.get("position") as string,
      age: parseInt(formData.get("age") as string),
    };

    addEmployee(employee);
    handleAddModalClose();
  };

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => setIsAddModalOpen(false);
  const handleEditModalOpen = (employee: Employee) => {
    setIsEditModalOpen(true);
    setSelectedEmployee(employee);
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };
  const handleDeleteModalOpen = (employee: Employee) => () => {
    setIsDeleteModalOpen(true);
    setSelectedEmployee(employee);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Employees</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Position</th>
              <th>Age</th>
              <th>Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.position}</td>
                <td>{employee.age}</td>
                <td>{employee.orders?.length}</td>
                <td>
                  <ActionButton
                    action={Action.EDIT}
                    onClick={() => handleEditModalOpen(employee)}
                  />
                  <ActionButton
                    action={Action.DELETE}
                    onClick={handleDeleteModalOpen(employee)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Button onClick={handleAddModalOpen}>Add Employee</Button>
        </div>
      </div>
      {isEditModalOpen && (
        <Modal onClose={handleEditModalClose}>
          <div className={styles.modal}>
            <h2 className={styles.title}>Edit Employee</h2>
            <form onSubmit={handleEditSubmit}>
              <Input
                label="Name"
                type="text"
                name="name"
                value={selectedEmployee?.name}
              />
              <Input
                label="Surname"
                type="text"
                name="surname"
                value={selectedEmployee?.surname}
              />
              <Input
                label="Position"
                type="text"
                name="position"
                value={selectedEmployee?.position}
              />
              <Input
                label="Age"
                type="number"
                name="age"
                value={selectedEmployee?.age}
              />
              <Button type="submit">Save</Button>
            </form>
          </div>
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal onClose={handleDeleteModalClose}>
          <div className={styles.modal}>
            <h2 className={styles.title}>Delete Employee</h2>
            <p>Are you sure you want to delete this employee?</p>
            <div className={styles.buttons}>
              <Button onClick={handleDeleteModalClose}>No</Button>
              <Button
                onClick={handleDelete}
                appearance={ButtonAppearance.DANGER}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isAddModalOpen && (
        <Modal onClose={handleAddModalClose}>
          <div className={styles.modal}>
            <h2 className={styles.title}>Add Employee</h2>
            <form onSubmit={handleAddSubmit}>
              <Input
                label="Name"
                type="text"
                name="name"
              />
              <Input
                label="Surname"
                type="text"
                name="surname"
              />
              <Input
                label="Position"
                type="text"
                name="position"
              />
              <Input
                label="Age"
                type="number"
                name="age"
              />
              <Button type="submit">Add</Button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default EmployeesPage;
