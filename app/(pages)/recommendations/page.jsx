import Header from "./_components/Header";
import SuggestedCard from "./_components/SuggestedCard";
import styles from "@components/Layout/Layout.module.scss"

export default function Home() {
  return (
    <main className={styles.mains}>
      <Header />
      <SuggestedCard />
    </main>
  );
}