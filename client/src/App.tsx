import { NavLink, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import OrdersPage from "./pages/orders/OrdersPage";
import EmployeesPage from "./pages/employees/EmployeesPage";

function App() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Order Management System</h1>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/employees">Employees</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/orders"
            element={<OrdersPage />}
          />
          <Route
            path="/employees"
            element={<EmployeesPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
