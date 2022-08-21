import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import styles from "./index.module.scss";
import Image from "next/image";
import CoverImage from "img/cover.jpg";
import CoverLogo from "img/home-circle-logo-black-white.png";
import Hill2 from "img/hill2.jpg";
import Hill3 from "img/hill3.jpg";
import { attributes, react as HomeContent } from "content/index.md";
import { remark } from "remark";
import html from "remark-html";
import { getBaseProps } from "lib/baseProps";

const pageProps = async (_: any) => {
  return {};
};
export const getStaticProps = getBaseProps(pageProps);

export default function Home({ baseProps }) {
  const [topBodyState, setTopBodyState] = React.useState("");

  const getTopBody = async () => {
    const topBodyContent = await remark()
      .use(html)
      .process(attributes.topbody as string);
    const topBodyHtml = topBodyContent.toString();
    setTopBodyState(topBodyHtml);
  };

  React.useEffect(() => {
    getTopBody();
  }, []);

  return (
    <Layout
      home
      navData={baseProps}
      top={
        <div className={styles.cover}>
          <div className={styles.coverText}>
            <div>
              <h1>Long Mynd Soaring Club</h1>
            </div>
          </div>
          <div className={styles.coverBackground}>
            <Image priority src={CoverImage} layout="fill" objectFit="cover" width="100%" height="100%" />
          </div>
          <div className={styles.coverLogo}>
            <div>
              <Image priority src={CoverLogo} layout="fill" width="100%" height="100%" />
            </div>
          </div>
        </div>
      }
    >
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <>
          <div dangerouslySetInnerHTML={{ __html: topBodyState }}></div>
          <section className={styles.homeSections}>
            <div>
              <a href="/sites/all-sites" className={styles.featureBox}>
                <Image src={Hill2} layout="fill" width="100%" height="100%" />
                <div className={styles.textContainer}>
                  <span>Site Guide</span>
                </div>
              </a>
            </div>
            <div>
              <a href="/sites/webcams" className={styles.featureBox}>
                <Image src={Hill3} layout="fill" width="100%" height="100%" />
                <div className={styles.textContainer}>
                  <span>Webcams</span>
                </div>
              </a>
            </div>
            <div className={styles.newsSection}>
              <div className={styles.shortNewsItem}>
                <h2>Recent News</h2>
                <strong>News item 1</strong>
                <small>
                  <em>29/8/2022</em>
                </small>
                <p>
                  A news story covering important developments within the LMSC community. Webcams are now back online...
                </p>
                <button>Read more</button>
              </div>
              <div className={styles.shortNewsItem}>
                <h2>Recent News</h2>
                <strong>News item 1</strong>
                <small>
                  <em>29/8/2022</em>
                </small>
                <p>
                  A news story covering important developments within the LMSC community. Webcams are now back online...
                </p>
                <button>Read more</button>
              </div>
            </div>
          </section>
          <HomeContent />
          {attributes.title}
          {attributes.date}
        </>
      </section>
    </Layout>
  );
}
