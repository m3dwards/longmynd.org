import Layout from "../../components/layout";
import { getAllCollectionIds, getCollectionData } from "../../lib/collection";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Site({
  siteData,
}: {
  siteData: {
    name: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{siteData.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.name}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={siteData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: siteData.contentHtml }} />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const siteData = await getCollectionData(params.id as string, "content/sites");
  console.log("data");
  console.log(siteData);
  return {
    props: {
      siteData,
    },
  };
};
