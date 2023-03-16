import BasicPage from "components/BasicPage";
import { getBaseProps } from "lib/baseProps";
import { getCollectionData } from "lib/collection";
import { basicPage } from "types";

export default function PayFee({ baseProps, siteData }: { baseProps: object; siteData: basicPage }) {
  console.log(baseProps);
  console.log(siteData);
  return <BasicPage baseProps={baseProps} siteData={siteData} />;
}

const pageProps = async (_: any) => {
  const siteData = getCollectionData("pay-fee", "content") as basicPage;
  return { siteData };
};

export const getStaticProps = getBaseProps(pageProps);
