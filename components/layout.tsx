import Head from "next/head";
import styles from "./layout.module.scss";
import Nav from "components/nav";
export const siteTitle = "LMSC Website";

export default function Layout({
  children,
  top,
  home,
  navData,
}: {
  children: React.ReactNode;
  top?: React.ReactNode;
  home?: boolean;
  navData: object;
}) {
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
        <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <div>
        <header className={styles.header}>
          <Nav data={navData as { sites: []; safety: []; learn: []; about: [] }} />
        </header>
      </div>
      <main className={styles.mainContainer}>
        {top && top}
        <div className={styles.main}>
          <div>
            {children}

            {!home && (
              <div className={styles.backToHome}>
                <a onClick={() => history.back()}>← Back</a>
              </div>
            )}
          </div>
        </div>
      </main>
      <div>
        <footer className={styles.footer}>
          <div>
            <span>
              The Long Mynd Soaring Club - <a href="https://github.com/maxwedwards/longmynd.org">Source code</a>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
