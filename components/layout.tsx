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
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d45500" />
        <meta name="msapplication-TileColor" content="#d45500" />
        <meta name="theme-color" content="#ffffff" />
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
