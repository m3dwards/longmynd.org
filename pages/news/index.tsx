import Head from "next/head";
import Layout, { siteTitle } from "components/layout";
import { attributes, react as NewsContent } from "content/news/index.md";
import { getBaseProps } from "lib/baseProps";
import { getAllCollectionData } from "lib/collection";
import { stripHtml } from "string-strip-html";
import Date from "components/date";
import styles from "./news.module.scss";

const pageProps = async (_: any) => {
  const newsPages = await getAllCollectionData("content/news");
  const weatherPages = await getAllCollectionData("content/weather");
  return { newsPages: newsPages, weatherPages: weatherPages };
};
export const getStaticProps = getBaseProps(pageProps);

export default function News({ baseProps, newsPages, weatherPages }) {
  return (
    <Layout home navData={baseProps}>
      <Head>
        <title>{"News - " + siteTitle}</title>
      </Head>
      <section>
        <>
          <NewsContent />

          <section>
            <h2>Recent Weather Updates</h2>
            <div className={styles.container}>
              {weatherPages &&
                weatherPages.map((item, index) => (
                  <a className={styles.newsItem} key={index} href={"/weather/" + item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <small>
                        <Date date={item.date} />
                      </small>
                      <div className={styles.summary}>{stripHtml(item.contentHtml).result}</div>
                    </div>
                  </a>
                ))}
            </div>
          </section>
          <section>
            <h2>Recent News</h2>
            <div className={styles.container}>
              {newsPages &&
                newsPages.map((item, index) => (
                  <a className={styles.newsItem} key={index} href={"/news/" + item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <small>
                        <Date date={item.date} />
                      </small>
                      <div className={styles.summary}>{stripHtml(item.contentHtml).result}</div>
                    </div>
                  </a>
                ))}
            </div>
          </section>
        </>
      </section>
    </Layout>
  );
}
