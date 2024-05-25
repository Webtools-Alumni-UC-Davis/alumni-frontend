import styles from "@components/Header/Header.module.scss";

export default function Header() {
  return (
    <div className={styles.container}>
        <h3 className={styles.text}>Recommendations</h3>
    </div>
  );
}