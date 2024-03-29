import Layout from "../../components/layout";
import { getAllCollectionIds, getCollectionData } from "../../lib/collection";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths } from "next";
import { getBaseProps } from "lib/baseProps";

export default function Site({
  siteData,
  baseProps,
}: {
  siteData: {
    title: string;
    date: Date;
    contentHtml: string;
  };
  baseProps: object;
}) {
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
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCollectionIds("content/weather");
  return {
    paths,
    fallback: false,
  };
};

const pageProps = async ({ params }) => {
  const siteData = getCollectionData(params.id as string, "content/weather");
  return {
    siteData,
  };
};
export const getStaticProps = getBaseProps(pageProps);
