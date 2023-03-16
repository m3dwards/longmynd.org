import Layout from "components/layout";
import Head from "next/head";
import utilStyles from "styles/utils.module.css";
import { basicPage } from "types";

interface basicPageProps {
  baseProps: object;
  siteData: basicPage;
}

export default function BasicPage(props: basicPageProps) {
  return (
    <Layout navData={props.baseProps}>
      <Head>
        <title>{props.siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{props.siteData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.siteData.contentHtml }} />
      </article>
    </Layout>
  );
}
