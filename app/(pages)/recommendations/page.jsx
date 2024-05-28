import Header from "./_components/Header";
import Recommendations  from "./_components/Recommendations";
import styles from "@components/Layout/Layout.module.scss";

export default function Home() {
  return (
    <main className={styles.mains}>
      <Header />
        <Recommendations />
    </main>
  );
}