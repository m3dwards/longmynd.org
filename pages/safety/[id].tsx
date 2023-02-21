import Layout from "../../components/layout";
import { getAllCollectionIds, getCollectionData } from "../../lib/collection";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths } from "next";
import { getBaseProps } from "lib/baseProps";
import styles from "./safety.module.scss";

export default function Site({ siteData, baseProps }: { siteData: siteData; baseProps: object }) {
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
        <section className={styles.quickLinks}>
          {siteData.safetyItems &&
            siteData.safetyItems.map((item, index) => (
              <a className={""} key={index} href={"#" + index}>
                <h3>{item.title}</h3>
              </a>
            ))}
        </section>
        <section>
          {siteData.safetyItems &&
            siteData.safetyItems.map((item, index) => (
              <>
                <h3 id={index.toString()}>{item.title}</h3>
                <p>{item.description}</p>
              </>
            ))}
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCollectionIds("content/safety");
  return {
    paths,
    fallback: false,
  };
};

interface safetyItem {
  title: string;
  description: string;
}

interface siteData {
  id: string;
  date: date;
  title: string;
  contentHtml: string;
  safetyItems: safetyItem[];
}

const pageProps = async ({ params }) => {
  const siteData = (await getCollectionData(params.id as string, "content/safety")) as siteData;
  return {
    siteData,
  };
};
export const getStaticProps = getBaseProps(pageProps);
