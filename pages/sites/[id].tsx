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

    contentHtml: string;
  };
  baseProps: object;
}) {
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
                      <strong>Grid Reference:</strong>
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
          <div>
            <h2>Sensitivities</h2>
            {siteData.sensitivities.map((s) => (
              <div className={styles.sensitivity}>
                <WarningIcon />
                {s.sensitivity}
              </div>
            ))}
          </div>
        )}
        {siteData.poiImage && (
          <>
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
          </>
        )}
        <h2>Description</h2>
        <div dangerouslySetInnerHTML={{ __html: siteData.contentHtml }} />
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
