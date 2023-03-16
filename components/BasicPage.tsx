import Layout from "components/layout";
import Head from "next/head";
import utilStyles from "styles/utils.module.css";
import { getBaseProps } from "lib/baseProps";
import { getCollectionData } from "lib/collection";

interface basicPageProps {
  id: string;
  path: string;
  baseProps: object;
}

export default async function BasicPage(props: basicPageProps) {
  const siteData = (await getCollectionData(props.id as string, props.path)) as siteData;
  return (
    <Layout navData={props.baseProps}>
      <Head>
        <title>{siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.title}</h1>
        {siteData.contentHtml}
      </article>
    </Layout>
  );
}

interface siteData {
  id: string;
  date: Date;
  title: string;
  contentHtml: string;
}

const pageProps = async (_: any) => {
  return {};
};

export const getStaticProps = getBaseProps(pageProps);
