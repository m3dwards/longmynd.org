import Head from "next/head";
import styles from "./layout.module.scss";
/* import utilStyles from "../styles/utils.module.css"; */
import Link from "next/link";
import Nav from "components/nav";
const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="LMSC Website" />
      </Head>
      <header className={styles.header}>
        <Nav />
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
