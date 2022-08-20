import Layout from "../../components/layout";
import { getAllCollectionIds, getCollectionData } from "../../lib/collection";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths } from "next";
import { getBaseProps } from "lib/baseProps";

export default function Site(props: {
  siteData: {
    name: string;
    date: Date;
    contentHtml: string;
  };
  sites: [];
}) {
  console.log("component got");
  console.log(props);
  return (
    <Layout navData={{ sites: props.sites }}>
      <Head>
        <title>{props.siteData.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{props.siteData.name}</h1>
        <div className={utilStyles.lightText}>
          <Date date={props.siteData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.siteData.contentHtml }} />
      </article>
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
  console.log("site data is");
  console.log(siteData);
  return {
    siteData,
  };
};
export const getStaticProps = getBaseProps(pageProps);
