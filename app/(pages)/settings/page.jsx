import Header from "./_components/Header";
import Notifications from "./_components/Subscription/Subscription";
import styles from "@components/Layout/Layout.module.scss"

export default function Home() {
  return (
    <main className={styles.mains}>
      <Header />
      <Notifications />
    </main>
  );
}