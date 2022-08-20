import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Image from "next/image";
import CoverImage from "img/cover.jpg";
import { attributes, react as NewsContent } from "content/news.md";
import { getBaseProps } from "lib/baseProps";

const pageProps = async (_: any) => {
  return {};
};
export const getStaticProps = getBaseProps(pageProps);

export default function Home({ baseProps }) {
  return (
    <Layout home navData={baseProps}>
      <Head>
        <title>{"News - " + siteTitle}</title>
      </Head>
      <section>
        <Image priority src={CoverImage} />
      </section>
      <section>
        <>
          <NewsContent />
          {attributes.title}
          {attributes.date}
        </>
      </section>
    </Layout>
  );
}
