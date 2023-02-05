import Layout, { siteTitle } from "components/layout";
import { getBaseProps } from "lib/baseProps";
import { attributes, react as SitesContent } from "content/sites/index.md";
import { getAllCollectionData } from "../../lib/collection";
import { site as siteType, additionalSite } from "types";
import WindRose from "components/WindRose";
import styles from "./site.module.scss";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import WindIndicator from "components/WindIndicator";

const pageProps = async (_: any) => {
  const collectionData = await getAllCollectionData("content/sites");
  return { sites: collectionData, additionalSites: attributes.otherClubsSites as Array<additionalSite> };
};
export const getStaticProps = getBaseProps(pageProps);

const sites = ({
  baseProps,
  sites,
  additionalSites,
}: {
  baseProps: any;
  sites: Array<{ date: string; name: string; id: string; contentHtml: string } & siteType>;
  additionalSites: Array<additionalSite>;
}) => {
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>Site Guide - {siteTitle}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>Site Guide</h1>
      <SitesContent />
      <div className={styles.windRose}>
        <h2>Wind Rose</h2>
        <WindRose sites={sites} additionalSites={additionalSites} width={800} />
      </div>
      <ul className={styles.siteSummaryBoxes}>
        {sites &&
          sites.map((site) => {
            console.log(site);
            return (
              <li key={site.id}>
                <a href={"/sites/" + site.id}>
                  <div className={styles.siteSummaryContainer}>
                    <div>
                      {site.name} <br />
                    </div>
                    <div className={styles.wind}>
                      {site.windDirection && <WindIndicator size="75" directions={site.windDirection} />}
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
      </ul>
    </Layout>
  );
};

export default sites;
