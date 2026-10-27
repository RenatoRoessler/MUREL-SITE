import styles from "./page.module.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Murel</h1>
        <p>Gestão operacional e financeira em um só lugar.</p>
        <a className={styles.cta} href={appUrl}>
          Acessar o sistema
        </a>
      </main>
    </div>
  );
}
