"use client";
import styles from "@/css/home.module.css";

export default function AboutPage() {
  return (
    <div className={styles.about_container}>
      <h1>About This Application</h1>
      <p>
        This is a simple book search application built with Next.js, TypeScript,
        Ant Design, Redux Toolkit, and the Open Library API.
      </p>
      <h2>Developer</h2>
      <p>
        Developed by Rochan Ragghu, a passionate web developer focused on
        building responsive and modern React applications.
      </p>
    </div>
  );
}
