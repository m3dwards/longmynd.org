import Layout from "components/layout";
import Head from "next/head";
import utilStyles from "styles/utils.module.css";
import { getBaseProps } from "lib/baseProps";
import { attributes, react as WebcamContent } from "content/webcams.md";

export default function Webcams({ baseProps }: { baseProps: object }) {
  const siteData: siteData = {
    id: attributes.id as string,
    date: attributes.date as Date,
    title: attributes.title as string,
    locations: attributes.locations as { name: string; description: string }[],
  };
  return (
    <Layout navData={baseProps}>
      <Head>
        <title>{siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.title}</h1>
        <WebcamContent />
        {siteData.locations && siteData.locations.map((l) => <div>{l.name}</div>)}
        {/* {siteData.weatherStations && (
          <section>
            <h2 id="weather">Weather Stations</h2>
            {siteData.weatherStations.map((ws) => (
              <div dangerouslySetInnerHTML={{ __html: ws.station }} />
            ))}
          </section>
        )}
        {siteData.webcams && (
          <section>
            <h2 id="webcams">Webcams</h2>
            <div dangerouslySetInnerHTML={{ __html: webcamsState }} />
          </section>
        )} */}
      </article>
    </Layout>
  );
}

interface siteData {
  id: string;
  date: Date;
  title: string;
  locations: { name: string }[];
}

const pageProps = async (_: any) => {
  return {};
};

export const getStaticProps = getBaseProps(pageProps);
