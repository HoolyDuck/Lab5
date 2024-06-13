import { useEffect, useState } from "react";
import { Employee } from "../types/employee.type";

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const deleteEmployee = async (id: string) => {
    await fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    });

    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  const addEmployee = async (employee: Employee) => {
    const response = await fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    const data = (await response.json()) as Employee;
    setEmployees([...employees, data]);
  };

  const editEmployee = async (employee: Employee) => {
    const response = await fetch(
      `http://localhost:3000/employees/${employee._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }
    );

    const data = (await response.json()) as Employee;
    setEmployees(employees.map((emp) => (emp._id === data._id ? data : emp)));
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("http://localhost:3000/employees");
      const data = (await response.json()) as Employee[];
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  return {
    employees,
    deleteEmployee,
    addEmployee,
    editEmployee,
  };
};

export default useEmployees;
