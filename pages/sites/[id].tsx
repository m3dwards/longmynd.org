import React from "react";
import { remark } from "remark";
import html from "remark-html";
import Layout, { siteTitle } from "../../components/layout";
import Image from "next/image";
import { getAllCollectionIds, getCollectionData } from "../../lib/collection";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths } from "next";
import styles from "./site.module.scss";
import { getBaseProps } from "lib/baseProps";
import Hill1 from "img/hill1.jpg";
import {
  WarningRegular as WarningIcon,
  CheckmarkCircle20Regular as CheckIcon,
  DismissCircle20Regular as ClosedIcon,
} from "@fluentui/react-icons";
import WindIndicator from "components/WindIndicator";

export default function Site({
  siteData,
  baseProps,
}: {
  siteData: {
    name: string;
    date: Date;
    mainImage: string;
    poiImage: string;
    status: string;
    sensitive: string;
    fee: string;
    hgRating: string;
    pgRating: string;
    windDirection: [];
    location: { what3words: string; latlong: string; physicalMaps: string };
    sensitivities: Array<{ sensitivity: string }>;

    accessAndParking: string;
    launchesAndLanding: string;
    flying: string;
    weatherStations: Array<{ station: string }>;
    webcams: string;
    localAttractions: string;
    siteRecords: Array<{ record: string }>;

    contentHtml: string;
  };
  baseProps: object;
}) {
  const [accessAndParkingState, setAccessAndParkingState] = React.useState("");
  const [launchesAndLandingState, setLaunchesAndLandingState] = React.useState("");
  const [flyingState, setFlyingState] = React.useState("");
  const [webcamsState, setWebcamsState] = React.useState("");
  const [localAttractionsState, setLocalAttractionsState] = React.useState("");

  const getMarkdownContent = async () => {
    const accessAndParkingContent = await remark()
      .use(html)
      .process(siteData.accessAndParking as string);
    setAccessAndParkingState(accessAndParkingContent.toString());

    const launchesAndLandingContent = await remark()
      .use(html)
      .process(siteData.launchesAndLanding as string);
    setLaunchesAndLandingState(launchesAndLandingContent.toString());

    const flyingContent = await remark()
      .use(html)
      .process(siteData.flying as string);
    setFlyingState(flyingContent.toString());

    const webcamsContent = await remark()
      .use(html)
      .process(siteData.webcams as string);
    setWebcamsState(webcamsContent.toString());

    const localAttractionsContent = await remark()
      .use(html)
      .process(siteData.localAttractions as string);
    setLocalAttractionsState(localAttractionsContent.toString());
  };

  React.useEffect(() => {
    getMarkdownContent();
  }, []);

  return (
    <Layout navData={baseProps}>
      <Head>
        <title>
          {siteData.name} - {siteTitle}
        </title>
      </Head>
      <section>
        <h1 className={utilStyles.headingXl}>{siteData.name}</h1>
        <div className={styles.topSection}>
          <div className={styles.keyInfo}>
            <h2>Key Info</h2>
            <table>
              {siteData.status && (
                <tr>
                  <td>
                    <strong>Status:</strong>
                  </td>
                  <td>
                    <span className={"pill " + (siteData.status.toLowerCase().includes("open") ? "green" : "red")}>
                      {siteData.status} {siteData.status.toLowerCase().includes("open") && <CheckIcon />}
                      {!siteData.status.toLowerCase().includes("open") && <ClosedIcon />}
                    </span>
                    {siteData.sensitive && (
                      <span className="pill warning">
                        Sensitive <WarningIcon fontSize={20} />
                      </span>
                    )}
                  </td>
                </tr>
              )}
              {siteData.fee && (
                <tr>
                  <td>
                    <strong>Site Fee</strong>
                  </td>
                  <td>{siteData.fee}</td>
                </tr>
              )}
              <tr>
                <td>
                  <strong>Required HG Rating:</strong>
                </td>
                <td>{siteData.hgRating}</td>
              </tr>
              <tr>
                <td>
                  <strong>Required PG Rating:</strong>
                </td>
                <td>{siteData.pgRating}</td>
              </tr>
              {siteData.windDirection && (
                <tr>
                  <td>
                    <strong>
                      Wind Direction{siteData.windDirection && siteData.windDirection.length > 1 ? "s" : ""}:
                    </strong>
                  </td>
                  <td>
                    {siteData.windDirection.map((wd) => (
                      <>
                        <span>
                          {wd["from"]} - {wd["to"]}
                        </span>
                        <br />
                      </>
                    ))}
                    <WindIndicator size={40} directions={siteData.windDirection} />
                  </td>
                </tr>
              )}
              {siteData.location && (
                <>
                  <tr>
                    <td>
                      <strong>What3words:</strong>
                    </td>
                    <td>{siteData.location.what3words}</td>
                  </tr>
                  {siteData.location.latlong && (
                    <>
                      <tr>
                        <td>
                          <strong>Latitude & Longitute:</strong>
                        </td>
                        <td>{siteData.location.latlong}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Online Maps:</strong>
                        </td>
                        <td>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              siteData.location.latlong
                            )}`}
                            target="_blank"
                          >
                            Google Maps
                          </a>
                          <br />
                          <a
                            href={`https://www.openstreetmap.org/?mlat=${siteData.location.latlong
                              .split(",")[0]
                              .trim()}&mlon=${siteData.location.latlong.split(",")[1].trim()}`}
                            target="_blank"
                          >
                            Open Street Map
                          </a>
                          <br />
                          <a
                            href={`https://explore.osmaps.com/pin?lat=${siteData.location.latlong
                              .split(",")[0]
                              .trim()}&lon=${siteData.location.latlong.split(",")[1].trim()}&zoom=14.0000`}
                            target="_blank"
                          >
                            OS Maps
                          </a>
                          <br />
                          <a
                            href={`https://www.bing.com/maps?cp=${siteData.location.latlong
                              .split(",")[0]
                              .trim()}~${siteData.location.latlong
                              .split(",")[1]
                              .trim()}&lvl=14&style=r&sp=point.${siteData.location.latlong
                              .split(",")[0]
                              .trim()}_${siteData.location.latlong.split(",")[1].trim()}_${encodeURIComponent(
                              siteData.location.latlong
                            )}`}
                            target="_blank"
                          >
                            Bing Maps
                          </a>
                          <br />
                        </td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td>
                      <strong>Physical Maps:</strong>
                    </td>
                    <td>{siteData.location.physicalMaps}</td>
                  </tr>
                </>
              )}
            </table>
          </div>
          {siteData.mainImage && (
            <div className={styles.picture}>
              <div>
                <a href={siteData.mainImage}>
                  <Image src={Hill1} priority layout="fill" objectFit="cover" />
                </a>
              </div>
            </div>
          )}
        </div>
        {siteData.sensitivities && (
          <section>
            <h2>Sensitivities</h2>
            {siteData.sensitivities.map((s) => (
              <div className={styles.sensitivity}>
                <WarningIcon />
                {s.sensitivity}
              </div>
            ))}
          </section>
        )}
        {siteData.poiImage && (
          <section>
            <h2>Points of interest</h2>
            <div className={styles.poiContainer}>
              <div className={styles.poiImage}>
                <a href={siteData.poiImage}>
                  <Image src={siteData.poiImage} priority layout="fill" objectFit="cover" />
                </a>
              </div>
              <div className={styles.poiKey}>
                Blue arrows = take-off areas <br />
                Green triangles = landing fields <br />
                Thick red line = power lines (note: not all power lines are shown) <br />
                Red oblong = gates P = parking <br />
                <strong>Click on map to increase size</strong>
              </div>
            </div>
          </section>
        )}
        <section>
          <h2>Introduction</h2>
          <div dangerouslySetInnerHTML={{ __html: siteData.contentHtml }} />
        </section>
        {siteData.accessAndParking && (
          <section>
            <h2>Access & Parking</h2>
            <div dangerouslySetInnerHTML={{ __html: accessAndParkingState }} />
          </section>
        )}
        {siteData.launchesAndLanding && (
          <section>
            <h2>Launches & Landing</h2>
            <div dangerouslySetInnerHTML={{ __html: launchesAndLandingState }} />
          </section>
        )}
        {siteData.flying && (
          <section>
            <h2>Flying</h2>
            <div dangerouslySetInnerHTML={{ __html: flyingState }} />
          </section>
        )}
        {siteData.weatherStations && (
          <section>
            <h2>Weather Stations</h2>
            {siteData.weatherStations.map((ws) => (
              <div dangerouslySetInnerHTML={{ __html: ws.station }} />
            ))}
          </section>
        )}
        {siteData.webcams && (
          <section>
            <h2>Webcams</h2>
            <div dangerouslySetInnerHTML={{ __html: webcamsState }} />
          </section>
        )}
        {siteData.localAttractions && (
          <section>
            <h2>Local Attractions</h2>
            <div dangerouslySetInnerHTML={{ __html: localAttractionsState }} />
          </section>
        )}
        {siteData.siteRecords && (
          <section>
            <h2>Site Records</h2>
            {siteData.siteRecords.map((sr) => (
              <div dangerouslySetInnerHTML={{ __html: sr.record }} />
            ))}
          </section>
        )}
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCollectionIds("content/sites");
  return {
    paths,
    fallback: false,
  };
};

const pageProps = async ({ params }) => {
  const siteData = await getCollectionData(params.id as string, "content/sites");
  return {
    siteData,
  };
};
export const getStaticProps = getBaseProps(pageProps);
