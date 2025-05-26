"use client";

import styles from "@/css/home.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        >
          <Icon fontSize={20} icon="material-symbols-light:home-rounded" />{" "}
          <span>Home</span>
        </Link>
        <Link
          href="/about"
          className={`${styles.link} ${
            pathname === "/about" ? styles.active : ""
          }`}
        >
          <Icon fontSize={20} icon="lucide:info" />
          <span>About</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
