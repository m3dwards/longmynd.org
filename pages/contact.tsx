import Layout from "components/layout";
import Head from "next/head";
import utilStyles from "styles/utils.module.css";
import { getBaseProps } from "lib/baseProps";
import { attributes, html as contactContent } from "content/contact.md";
import parseLinks from "lib/links";

export default function Contact({ baseProps }: { baseProps: object }) {
  const siteData: siteData = {
    id: attributes.id as string,
    date: attributes.date as Date,
    title: attributes.title as string,
  };
  const parsedContactContent = parseLinks(contactContent);
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>{siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: parsedContactContent }} />
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
