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
    hgRating: string;
    pgRating: string;
    windDirection: [];
    location: { gridref: string; latlong: string; maps: string };
    sensitivities: string;

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
              <tr>
                <td>
                  <strong>Status:</strong>
                </td>
                <td>{siteData.status}</td>
              </tr>
              <tr>
                <td>
                  <strong>Sensitive:</strong>
                </td>
                <td>{siteData.sensitive}</td>
              </tr>
              <tr>
                <td>
                  <strong>HG Rating:</strong>
                </td>
                <td>{siteData.hgRating}</td>
              </tr>
              <tr>
                <td>
                  <strong>PG Rating:</strong>
                </td>
                <td>{siteData.pgRating}</td>
              </tr>
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
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Grid Reference:</strong>
                </td>
                <td>{siteData.location.gridref}</td>
              </tr>
              <tr>
                <td>
                  <strong>Latitude & Longitute:</strong>
                </td>
                <td>{siteData.location.latlong}</td>
              </tr>
              <tr>
                <td>
                  <strong>Maps:</strong>
                </td>
                <td>{siteData.location.maps}</td>
              </tr>
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
        <div>
          <h2>Sensitivities</h2>
          <div dangerouslySetInnerHTML={{ __html: siteData.sensitivities }} />
        </div>
        {siteData.poiImage && (
          <div>
            <h2>Points of interest</h2>
            <div className="poiImage">
              <a href={siteData.poiImage}>
                <Image src={siteData.poiImage} priority layout="fill" objectFit="cover" />
              </a>
            </div>
            <div className="poiKey">
              Blue arrows = take-off areas <br />
              Green triangles = landing fields <br />
              Thick red line = power lines (note: not all power lines are shown) <br />
              Red oblong = gates P = parking <br />
              <strong>Click on map to increase size</strong>
            </div>
          </div>
        )}
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
