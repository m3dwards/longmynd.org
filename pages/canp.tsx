import Layout from "components/layout";
import Head from "next/head";
import utilStyles from "styles/utils.module.css";
import { getBaseProps } from "lib/baseProps";
import { attributes, react as CANPContent } from "content/canp.md";

export default function CANP({ baseProps }: { baseProps: object }) {
  const siteData: siteData = {
    id: attributes.id as string,
    date: attributes.date as Date,
    title: attributes.title as string,
  };
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>{siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.title}</h1>
        <CANPContent />
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
