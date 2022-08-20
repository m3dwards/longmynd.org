import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { GetStaticProps } from "next";
import Image from "next/image";
import CoverImage from "img/cover.jpg";
import { attributes, react as HomeContent } from "content/index.md";
import { getSortedCollectionData } from "lib/collection";
import { getBaseProps } from "lib/baseProps";

const pageProps = async (_: any) => {
  const allSitesData = getSortedCollectionData("content/sites");
  return { sites2: allSitesData };
};
export const getStaticProps = getBaseProps(pageProps);

export default function Home({ sites, sites2 }) {
  return (
    <Layout home navData={{ sites }}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <Image priority src={CoverImage} />
      </section>
      <section>
        <>
          <HomeContent />
          {attributes.title}
          {attributes.date}
        </>
      </section>
    </Layout>
  );
}
