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
import {
  WarningRegular as WarningIcon,
  CheckmarkCircle20Regular as CheckIcon,
  DismissCircle20Regular as ClosedIcon,
} from "@fluentui/react-icons";
import WindIndicator from "components/WindIndicator";
import { site as siteType } from "types";
import PillStatus from "components/PillStatus";
import PillSensitive from "components/PillSensitive";

export default function Site({
  siteData,
  baseProps,
}: {
  siteData: siteType & {
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
                    <PillStatus status={siteData.status} />
                    <PillSensitive sensitive={siteData.sensitive} />
                  </td>
                </tr>
              )}
              {siteData.fee && (
                <tr>
                  <td>
                    <strong>Site Fee</strong>
                  </td>
                  <td>
                    {siteData.fee} - <a href="/pay-fee">pay online</a>
                  </td>
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
                    <td>
                      <a
                        href={"https://what3words.com/" + siteData.location.what3words.replace(/\//g, "")}
                        target="_blank"
                      >
                        {siteData.location.what3words}
                      </a>
                    </td>
                  </tr>
                  {siteData.location.latlong && (
                    <>
                      <tr>
                        <td>
                          <strong>Latitude & Longitude:</strong>
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
                            href={`https://explore.osmaps.com/pin?lat=${siteData.location.latlong
                              .split(",")[0]
                              .trim()}&lon=${siteData.location.latlong.split(",")[1].trim()}&zoom=14.0000`}
                            target="_blank"
                          >
                            OS Maps
                          </a>
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
                  <Image src={siteData.mainImage} priority layout="fill" objectFit="cover" />
                </a>
              </div>
            </div>
          )}
        </div>
        <nav className={styles.subNav}>
          <ul>
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            {siteData.sensitivities && (
              <li>
                <a href="#sensitivites">Sensitivities</a>
              </li>
            )}
            {siteData.poiImage && (
              <li>
                <a href="#poi">Points Of Interest</a>
              </li>
            )}
            {siteData.accessAndParking && (
              <li>
                <a href="#access">Access & Parking</a>
              </li>
            )}
            {siteData.launchesAndLanding && (
              <li>
                <a href="#launches">Launches & Landing</a>
              </li>
            )}
            {siteData.flying && (
              <li>
                <a href="#flying">Flying</a>
              </li>
            )}
            {siteData.weatherStations && (
              <li>
                <a href="#weather">Weather Stations</a>
              </li>
            )}
            {siteData.webcams && (
              <li>
                <a href="#webcams">Webcams</a>
              </li>
            )}
            {siteData.localAttractions && (
              <li>
                <a href="#local">Local Attractions</a>
              </li>
            )}
            {siteData.siteRecords && (
              <li>
                <a href="#records">Site Records</a>
              </li>
            )}
          </ul>
        </nav>
        {siteData.sensitivities && (
          <section>
            <h2 id="sensitivites">Sensitivities</h2>
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
            <h2 id="poi">Points of interest</h2>
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
          <h2 id="introduction">Introduction</h2>
          <div dangerouslySetInnerHTML={{ __html: siteData.contentHtml }} />
        </section>
        {siteData.accessAndParking && (
          <section>
            <h2 id="access">Access & Parking</h2>
            <div dangerouslySetInnerHTML={{ __html: accessAndParkingState }} />
          </section>
        )}
        {siteData.launchesAndLanding && (
          <section>
            <h2 id="launches">Launches & Landing</h2>
            <div dangerouslySetInnerHTML={{ __html: launchesAndLandingState }} />
          </section>
        )}
        {siteData.flying && (
          <section>
            <h2 id="flying">Flying</h2>
            <div dangerouslySetInnerHTML={{ __html: flyingState }} />
          </section>
        )}
        {siteData.weatherStations && (
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
        )}
        {siteData.localAttractions && (
          <section>
            <h2 id="local">Local Attractions</h2>
            <div dangerouslySetInnerHTML={{ __html: localAttractionsState }} />
          </section>
        )}
        {siteData.siteRecords && (
          <section>
            <h2 id="records">Site Records</h2>
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
  const siteData = getCollectionData(params.id as string, "content/sites");
  return {
    siteData,
  };
};
export const getStaticProps = getBaseProps(pageProps);
