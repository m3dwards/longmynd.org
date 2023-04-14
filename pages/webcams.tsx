import Layout from "components/layout";
import Head from "next/head";
import utilStyles from "styles/utils.module.css";
import { getBaseProps } from "lib/baseProps";
import { attributes, html as webcamContent } from "content/webcams.md";
import { remark } from "remark";
import html from "remark-html";
import parseLinks from "lib/links";

export default function Webcams({ baseProps }: { baseProps: object }) {
  const siteData: siteData = {
    id: attributes.id as string,
    date: attributes.date as Date,
    title: attributes.title as string,
    locations: attributes.locations as {
      name: string;
      description: string;
      weatherStations: Array<{ station: string }>;
      webcams: string;
    }[],
  };
  const parsedWebcamContent = parseLinks(webcamContent);

  return (
    <Layout navData={baseProps}>
      <Head>
        <title>{siteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{siteData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: parsedWebcamContent }} />
        <section className="quickLinks">
          {siteData.locations &&
            siteData.locations.map((item, index) => (
              <a className={""} key={index} href={"#" + index}>
                <h3>{item.name}</h3>
              </a>
            ))}
        </section>
        {siteData.locations &&
          siteData.locations.map((l, index) => (
            <section key={index}>
              <h2 id={index.toString()}>{l.name}</h2>
              <p>{l.description}</p>
              {l.weatherStations && (
                <section>
                  <h3 id="weather">Weather Stations</h3>
                  {l.weatherStations.map((ws, wsindex) => (
                    <div key={wsindex} dangerouslySetInnerHTML={{ __html: parseLinks(ws.station) }} />
                  ))}
                </section>
              )}
              {l.webcams && (
                <section>
                  <h3 id="webcams">Webcams</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parseLinks(remark().use(html).processSync(l.webcams).toString()),
                    }}
                  />
                </section>
              )}
            </section>
          ))}
      </article>
    </Layout>
  );
}

interface siteData {
  id: string;
  date: Date;
  title: string;
  locations: { name: string; description: string; weatherStations: Array<{ station: string }>; webcams: string }[];
}

const pageProps = async (_: any) => {
  return {};
};

export const getStaticProps = getBaseProps(pageProps);
