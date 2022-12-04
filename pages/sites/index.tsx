import Layout from "components/layout";
import { getBaseProps } from "lib/baseProps";
import { attributes, react as SitesContent } from "content/sites/index.md";
import { getAllCollectionData } from "../../lib/collection";
import { site as siteType, additionalSite } from "types";
import WindRose from "components/WindRose";
import styles from "./site.module.scss";

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
      <div className={styles.windRose}>
        <WindRose sites={sites} additionalSites={additionalSites} width={800} />
      </div>
      <ul>
        {sites &&
          sites.map((site) => (
            <li key={site.id}>
              <a href={"/sites/" + site.id}>{site.name}</a>
            </li>
          ))}
      </ul>
      <SitesContent />
    </Layout>
  );
};

export default sites;
