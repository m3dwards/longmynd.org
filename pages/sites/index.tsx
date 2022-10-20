import Layout from "components/layout";
import { getBaseProps } from "lib/baseProps";
import { attributes, react as SitesContent } from "content/sites/index.md";
import { getAllCollectionData } from "../../lib/collection";
import { site as siteType } from "types";
import WindRose from "components/WindRose";

const pageProps = async (_: any) => {
  const collectionData = await getAllCollectionData("content/sites");
  return { sites: collectionData };
};
export const getStaticProps = getBaseProps(pageProps);

const sites = ({
  baseProps,
  sites,
}: {
  baseProps: any;
  sites: Array<{ date: string; name: string; id: string; contentHtml: string } & siteType>;
}) => {
  return (
    <Layout navData={baseProps}>
      <WindRose sites={sites} />
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
