import Layout from "../../components/layout";
import { getAllCollectionIds, getCollectionData } from "../../lib/collection";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths } from "next";
import { getBaseProps } from "lib/baseProps";

export default function About({ siteData, baseProps }: { siteData: siteData; baseProps: object }) {
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>{siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: siteData.contentHtml }} />
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

interface siteData {
  id: string;
  date: Date;
  title: string;
  contentHtml: string;
}

const pageProps = async ({ params }) => {
  const siteData = (await getCollectionData(params.id as string, "content/about")) as siteData;
  return {
    siteData,
  };
};
export const getStaticProps = getBaseProps(pageProps);
