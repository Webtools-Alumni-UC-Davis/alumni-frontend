import Header from "./_components/Header";
import AlumniUpdates from "./_components/AlumniUpdates";
import styles from "@components/Layout/Layout.module.scss"

export default function Home() {
  return (
    <main className={styles.mains}>
      <Header />
      <AlumniUpdates />
    </main>
  );
}