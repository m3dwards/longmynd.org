import Layout, { siteTitle } from "../../components/layout";
import Image from "next/image";
import { getAllCollectionIds, getCollectionData } from "../../lib/collection";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths } from "next";
import styles from "./site.module.scss";
import { getBaseProps } from "lib/baseProps";

export default function Site({
  siteData,
  baseProps,
}: {
  siteData: {
    name: string;
    date: Date;
    mainImage: string;
    contentHtml: string;
  };
  baseProps: object;
}) {
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>
          {siteData.name} - {siteTitle}
        </title>
      </Head>
      <section>
        <h1 className={utilStyles.headingXl}>{siteData.name}</h1>
        <div className={styles.topSection}>
          <div className={styles.keyInfo}></div>
          <div className={styles.picture}>
            <Image src={siteData.mainImage} priority width="300px" height="300px" />
          </div>
        </div>
        <div className={utilStyles.lightText}>
          <Date date={siteData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: siteData.contentHtml }} />
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCollectionIds("content/sites");
  return {
    paths,
    fallback: false,
  };
};

const pageProps = async ({ params }) => {
  const siteData = await getCollectionData(params.id as string, "content/sites");
  return {
    siteData,
  };
};
export const getStaticProps = getBaseProps(pageProps);
