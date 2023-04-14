import Head from "next/head";
import Layout, { siteTitle } from "components/layout";
import { attributes, html as newsContent } from "content/news/index.md";
import { getBaseProps } from "lib/baseProps";
import { getAllCollectionData } from "lib/collection";
import { stripHtml } from "string-strip-html";
import FormatDate from "components/date";
import styles from "./news.module.scss";
import parseLinks from "lib/links";

const pageProps = async (_: any) => {
  let newsPages = await getAllCollectionData("content/news");
  newsPages.sort((npa, npb) => {
    return new Date(npb.date).valueOf() - new Date(npa.date).valueOf();
  });
  let weatherPages = await getAllCollectionData("content/weather");
  weatherPages.sort((wa, wb) => {
    return new Date(wb.date).valueOf() - new Date(wa.date).valueOf();
  });
  weatherPages = weatherPages.slice(0, 3);
  return { newsPages: newsPages, weatherPages: weatherPages };
};
export const getStaticProps = getBaseProps(pageProps);

export default function News({ baseProps, newsPages, weatherPages }) {
  const parsedNewsContent = parseLinks(newsContent);
  return (
    <Layout home navData={baseProps}>
      <Head>
        <title>{"News - " + siteTitle}</title>
      </Head>
      <section>
        <>
          <div dangerouslySetInnerHTML={{ __html: parsedNewsContent }} />
          <section>
            <h2>Recent Weather Updates</h2>
            <div className={styles.container}>
              {weatherPages &&
                weatherPages.map((item, index) => (
                  <a className={styles.newsItem} key={index} href={"/weather/" + item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <small>
                        <FormatDate date={item.date} />
                      </small>
                      <div className={styles.summary}>{stripHtml(item.contentHtml).result}</div>
                    </div>
                  </a>
                ))}
            </div>
          </section>
          <section>
            <h2>Latest News</h2>
            <div className={styles.container}>
              {newsPages &&
                newsPages.map((item, index) => (
                  <a className={styles.newsItem} key={index} href={"/news/" + item.id}>
                    <div>
                      <h3>{item.title}</h3>
                      <small>
                        <FormatDate date={item.date} />
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
