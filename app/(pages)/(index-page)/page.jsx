import Header from "./_components/Header";
import CurrentCount from "./_components/CurrentCount";
import YearAlumni from "./_components/YearAlumni";
import AlumniJobs from "./_components/AlumniJobs";
import TopCompanies from "./_components/TopCompanies";
import AlumniLocations from "./_components/AlumniLocations";
import AlumniUpdates from "./_components/AlumniUpdates";
import styles from "@components/Layout/Layout.module.scss"

export default function Home() {
  return (
    <main className={styles.mains}>
      <Header />
        <div className={styles.ColRow}>
          <div className={styles.RowCol}>
            <div className={styles.ColRow} style={{ justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
              <CurrentCount />
              <YearAlumni />
            </div>
            <AlumniJobs />
          </div>
          <AlumniUpdates />
        </div>
        <div className={`${styles.ColRow} ${styles.marginTop}`}>
        <TopCompanies />
        <AlumniLocations />
      </div>
    </main>
  );
}
