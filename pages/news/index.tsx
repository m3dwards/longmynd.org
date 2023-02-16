import Head from "next/head";
import Layout, { siteTitle } from "components/layout";
import { attributes, react as NewsContent } from "content/news.md";
import { getBaseProps } from "lib/baseProps";
import { getAllCollectionData } from "lib/collection";
import { stripHtml } from "string-strip-html";
import Date from "../../components/date";

const pageProps = async (_: any) => {
  const newsPages = await getAllCollectionData("content/news");
  const weatherPages = await getAllCollectionData("content/weather");
  return { newsPages: newsPages, weatherPages: weatherPages };
};
export const getStaticProps = getBaseProps(pageProps);

export default function Home({ baseProps, newsPages, weatherPages }) {
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
            {weatherPages &&
              weatherPages.map((item, index) => (
                <div key={index}>
                  <h3>
                    <a href={"/weather/" + item.id}>{item.title}</a>
                  </h3>
                  <div>
                    <Date date={item.date} />
                  </div>
                  <div>{stripHtml(item.contentHtml).result}</div>
                </div>
              ))}
          </section>
          <section>
            <h2>Recent News</h2>
            {newsPages &&
              newsPages.map((item, index) => (
                <div key={index}>
                  <h3>
                    <a href={"/news/" + item.id}>{item.title}</a>
                  </h3>
                  <div>
                    <Date date={item.date} />
                  </div>
                  <div>{stripHtml(item.contentHtml).result}</div>
                </div>
              ))}
          </section>
        </>
      </section>
    </Layout>
  );
}
