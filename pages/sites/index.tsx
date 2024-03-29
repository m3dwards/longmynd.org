import Layout, { siteTitle } from "components/layout";
import { getBaseProps } from "lib/baseProps";
import { attributes, html as sitesContent } from "content/sites/index.md";
import { getAllCollectionData } from "../../lib/collection";
import { site as siteType, additionalSite } from "types";
import WindRose from "components/WindRose";
import styles from "./site.module.scss";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import WindIndicator from "components/WindIndicator";
import PillStatus from "components/PillStatus";
import PillSensitive from "components/PillSensitive";
import parseLinks from "lib/links";

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
  sites = sites.filter((s) => s.published);
  const parsedSitesContent = parseLinks(sitesContent);
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>Site Guide - {siteTitle}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>Site Guide</h1>
      <div dangerouslySetInnerHTML={{ __html: parsedSitesContent }} />
      <div className={styles.windRose}>
        <h2>Wind Rose</h2>
        <WindRose sites={sites} additionalSites={additionalSites} width={700} />
      </div>
      <ul className={styles.siteSummaryBoxes}>
        {sites &&
          sites.map((site) => {
            return (
              <li key={site.id}>
                <a href={"/sites/" + site.id}>
                  <div className={styles.siteSummaryContainer}>
                    <div>
                      <div className={styles.siteSummaryMain}>
                        <span className={styles.siteSummaryTitle}>{site.name}</span>
                        <PillStatus status={site.status} />
                        <PillSensitive sensitive={site.sensitive} />
                      </div>
                    </div>
                    <div className={styles.wind}>
                      {site.windDirection && <WindIndicator size={75} directions={site.windDirection} />}
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
