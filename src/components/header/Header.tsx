import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {

  return (
    <header className={styles.header}>
      <h2>Weather App</h2>
      <div>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/"}>Home</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/history"}>History</NavLink>
      </div>
      
      
    </header>
  );
}
