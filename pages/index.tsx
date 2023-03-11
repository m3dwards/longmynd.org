import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import styles from "./index.module.scss";
import Image from "next/image";
import CoverImage from "img/cover.jpg";
import CoverLogo from "img/home-circle-logo-black-white.png";
import Hill2 from "img/hill2.jpg";
import Hill3 from "img/hill3.jpg";
import CANP from "img/canp.jpg";
import Incident from "img/incident.jpg";
import { attributes, react as HomeContent } from "content/index.md";
import { remark } from "remark";
import html from "remark-html";
import { getBaseProps } from "lib/baseProps";
import { getAllCollectionData } from "lib/collection";
import { stripHtml } from "string-strip-html";
import FormatDate from "components/date";

const pageProps = async (_: any) => {
  let newsPages = await getAllCollectionData("content/news");
  newsPages.sort((npa, npb) => {
    return new Date(npb.date).valueOf() - new Date(npa.date).valueOf();
  });
  newsPages = newsPages.slice(0, 2);
  let weatherPages = await getAllCollectionData("content/weather");
  weatherPages.sort((wa, wb) => {
    return new Date(wb.date).valueOf() - new Date(wa.date).valueOf();
  });
  newsPages.unshift(weatherPages.shift());
  return { newsPages: newsPages };
};
export const getStaticProps = getBaseProps(pageProps);

export default function Home({ baseProps, newsPages }) {
  const [topBodyState, setTopBodyState] = React.useState("");

  const getTopBody = async () => {
    const topBodyContent = await remark()
      .use(html)
      .process(attributes.topBody as string);
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
          <a target="_blank" href="https://webcollect.org.uk/lmsc/subscription">
            <button>Pay £3 Long Mynd day fee</button>
          </a>
          <section className={styles.homeSections}>
            <div className={styles.homeQuickLinks}>
              <a href="/sites" className={styles.featureBox}>
                <Image priority src={Hill2} layout="fill" width="100%" height="100%" />
                <div className={styles.textContainer}>
                  <span>Site Guide</span>
                </div>
              </a>
              <a href="/webcams" className={styles.featureBox}>
                <Image priority src={Hill3} layout="fill" width="100%" height="100%" />
                <div className={styles.textContainer}>
                  <span>Webcams</span>
                </div>
              </a>
              <a href="/report-incident" className={styles.featureBox}>
                <Image priority src={Incident} layout="fill" width="100%" height="100%" />
                <div className={styles.textContainer}>
                  <span>Report an incident</span>
                </div>
              </a>
              <a href="/canp" className={styles.featureBox}>
                <Image priority src={CANP} layout="fill" width="100%" height="100%" />
                <div className={styles.textContainer}>
                  <span>CANP</span>
                </div>
              </a>
            </div>
            <div className={styles.newsSection}>
              <h2>Latest Weather & News</h2>
              {newsPages &&
                newsPages.map((item, index) => (
                  <a className={styles.shortNewsItem} key={index} href={"/news/" + item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <small>
                        <FormatDate date={item.date} />
                      </small>
                      <div className={styles.summary}>{stripHtml(item.contentHtml).result}</div>
                      <button>Read more</button>
                    </div>
                  </a>
                ))}
            </div>
          </section>
          <HomeContent />
        </>
      </section>
    </Layout>
  );
}
