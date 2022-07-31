import Head from "next/head";
import styles from "./layout.module.scss";
/* import utilStyles from "../styles/utils.module.css"; */
import Link from "next/link";

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="LMSC Website" />
      </Head>
      <header className={styles.header}>
        <div>
          <a href="/">Home</a>
        </div>
        <div>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/sites">Sites</a>
            </li>
            <li>
              <a href="/events">Events</a>
            </li>
          </ul>
        </div>
        <div>
          <button>Join Us</button>
        </div>
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
