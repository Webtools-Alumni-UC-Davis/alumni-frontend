import styles from "@components/Header/Header.module.scss";

export default function Header() {
  return (
    <div className={styles.container} data-testid="header-container">
        <h3 className={styles.text}>Dashboard</h3>
    </div>
  );
}
