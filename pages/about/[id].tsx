import Layout from "../../components/layout";
import { getAllCollectionIds, getCollectionData } from "../../lib/collection";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths } from "next";
import { getBaseProps } from "lib/baseProps";
import { remark } from "remark";
import html from "remark-html";

export default function About({ siteData, baseProps }: { siteData: siteData; baseProps: object }) {
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>{siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={siteData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: siteData.contentHtml }} />
        <section className="quickLinks">
          {siteData.pageItems &&
            siteData.pageItems.map((item, index) => (
              <a className={""} key={index} href={"#" + index}>
                <h3>{item.title}</h3>
              </a>
            ))}
        </section>
        <section>
          {siteData.pageItems &&
            siteData.pageItems.map((item, index) => (
              <div key={index}>
                <h3 id={index.toString()}>{item.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: remark().use(html).processSync(item.description).toString() }}
                />
              </div>
            ))}
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCollectionIds("content/about");
  return {
    paths,
    fallback: false,
  };
};

interface pageItem {
  title: string;
  description: string;
}

interface siteData {
  id: string;
  date: Date;
  title: string;
  contentHtml: string;
  pageItems: pageItem[];
}

const pageProps = async ({ params }) => {
  const siteData = (await getCollectionData(params.id as string, "content/about")) as siteData;
  return {
    siteData,
  };
};
export const getStaticProps = getBaseProps(pageProps);
