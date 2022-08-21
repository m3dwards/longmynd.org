import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import styles from "./index.module.scss";
import Image from "next/image";
import CoverImage from "img/cover.jpg";
import CoverLogo from "img/home-circle-logo-transparent.png";
import { attributes, react as HomeContent } from "content/index.md";
import { getBaseProps } from "lib/baseProps";

const pageProps = async (_: any) => {
  return {};
};
export const getStaticProps = getBaseProps(pageProps);

export default function Home({ baseProps }) {
  return (
    <Layout
      home
      navData={baseProps}
      top={
        <div className={styles.cover}>
          <div className={styles.coverText}>
            <h1>Long Mynd Soaring Club</h1>
          </div>
          <div className={styles.coverBackground}>
            <Image priority src={CoverImage} layout="fill" objectFit="cover" width="100%" height="100%" />
          </div>
          <div className={styles.coverLogo}>
            <Image priority src={CoverLogo} width="220px" height="220px" />
          </div>
        </div>
      }
    >
      <Head>
        <title>{siteTitle}</title>
      </Head>
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
