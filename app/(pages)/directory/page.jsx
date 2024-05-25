import Header from "./_components/Header";
import Search from "./_components/Search";
import styles from "@components/Layout/Layout.module.scss"

export default function Home() {
  return (
    <main className={styles.mains}>
      <Header />
      <Search />
    </main>
  );
}