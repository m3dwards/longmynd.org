import { GetStaticProps } from "next";
import { getSortedCollectionData } from "lib/collection";

// this really hurt my head writing, good luck!
export const getBaseProps: (pageDataFn: (passedContext: any) => Promise<object>) => GetStaticProps =
  (pageDataFn: (passedContext: any) => Promise<object>) => async (context: any) => {
    const allSitesData = getSortedCollectionData("content/sites");
    const pageData = await pageDataFn(context);
    return {
      props: {
        sites: allSitesData,
        ...pageData,
      },
    };
  };
