import Layout from "components/layout";
import Head from "next/head";
import utilStyles from "styles/utils.module.css";
import { getBaseProps } from "lib/baseProps";
import { attributes, html as CANPContent } from "content/canp.md";
import parseLinks from "lib/links";

export default function CANP({ baseProps }: { baseProps: object }) {
  const siteData: siteData = {
    id: attributes.id as string,
    date: attributes.date as Date,
    title: attributes.title as string,
  };
  const parsedCANPContent = parseLinks(CANPContent);
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>{siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: parsedCANPContent }} />
      </article>
    </Layout>
  );
}

interface siteData {
  id: string;
  date: Date;
  title: string;
}

const pageProps = async (_: any) => {
  return {};
};

export const getStaticProps = getBaseProps(pageProps);
