import Layout from "components/layout";
import { getCollectionData } from "lib/collection";
import Head from "next/head";
import Date from "components/date";
import utilStyles from "styles/utils.module.css";
import { getBaseProps } from "lib/baseProps";
import { remark } from "remark";
import html from "remark-html";
import { attributes, react as SocialContent } from "content/social.md";

export default function Social({ baseProps }: { baseProps: object }) {
  const siteData: siteData = {
    id: attributes.id as string,
    date: attributes.date as Date,
    title: attributes.title as string,
    pageItems: attributes.pageItems as pageItem[],
  };
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>{siteData.title as string}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{attributes.title as string}</h1>
        <div className={utilStyles.lightText}>{/* <Date date={attributes.date} /> */}</div>
        <SocialContent />
        <section className="quickLinks">
          {siteData.pageItems &&
            (siteData.pageItems as []).map((item, index) => (
              <a className={""} key={index} href={"#" + index}>
                <h3>{item.title}</h3>
              </a>
            ))}
        </section>
        <section>
          {siteData.pageItems &&
            (siteData.pageItems as []).map((item, index) => (
              <div key={index}>
                <h3 id={index.toString()}>{item.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: remark().use(html).processSync(item.description).toString() }}
                />
              </div>
            ))}
        </section>
      </article>
    </Layout>
  );
}

interface pageItem {
  title: string;
  description: string;
}

interface siteData {
  id: string;
  date: Date;
  title: string;
  pageItems: pageItem[];
}

const pageProps = async (_: any) => {
  return {};
};

export const getStaticProps = getBaseProps(pageProps);
