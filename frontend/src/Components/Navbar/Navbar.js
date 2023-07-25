import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <h1 className={styles.Navbar__title}>Your Code Zone!</h1>
      <ul className={styles.Navbar__list}>
        <li className={styles.Navbar__item}>
          <NavLink
            exact
            to="/"
            className={styles.Navbar__link}
            activeClassName={styles.active}
          >
            Problems
          </NavLink>
        </li>
        <li className={styles.Navbar__item}>
          <NavLink
            to="/create"
            className={styles.Navbar__link}
            activeClassName={styles.active}
          >
            Add Problems
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
