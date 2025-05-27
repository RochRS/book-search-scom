"use client";

import styles from "@/css/about.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function AboutPage() {
  return (
    <div className={styles.about_container}>
      <section className={styles.hero}>
        <h1>About This Application</h1>
        <p>
          Discover books by title or keyword. Browse results in a sleek,
          paginated table and view detailed info like author, publish date and
          cover images. Smooth navigation with saved search state for a seamless
          user experience.
        </p>
      </section>

      <section className={styles.profileCard}>
        <div>
          <h2>
            <Icon color="red" icon="ph:code-duotone" fontSize={36} />
            <span>Developer: Roch@n</span>
          </h2>
          <p>
            Hi! I'm <strong>Rochan Ragghu</strong>, a passionate junior{" "}
            <strong>front-end developer</strong> with a strong focus on clean,
            user-centered design and modern web technologies.
          </p>

          <p>
            I build responsive and interactive interfaces using tools like{" "}
            <strong>React, Next.js, TypeScript, NodeJS and much more.</strong>I
            care deeply about UI/UX and strive to create polished, intuitive
            experiences across all devices.
          </p>

          <p>
            Whether it’s sleek landing pages, reusable components, or dynamic
            dashboards—I write clean, maintainable code that brings ideas to
            life. I'm always learning and experimenting with the latest design
            systems and tools to grow as a developer.
          </p>

          <p>
            If you're looking for someone who codes with care and designs with
            the user in mind—let’s build something great :)
          </p>
        </div>
      </section>
    </div>
  );
}
