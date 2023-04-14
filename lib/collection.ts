import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import parseLinks from "lib/links";

export function getSortedCollectionData(collectionPath: string) {
  const collectionDirectory = path.join(process.cwd(), collectionPath);
  // Get file names under /collection
  const fileNames = fs.readdirSync(collectionDirectory);
  const allCollectionData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(collectionDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the collection metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort collection by date
  return allCollectionData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllCollectionIds(collectionPath: string) {
  const collectionDirectory = path.join(process.cwd(), collectionPath);
  const fileNames = fs.readdirSync(collectionDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getCollectionData(id: string, collectionPath: string) {
  const collectionDirectory = path.join(process.cwd(), collectionPath);
  const fullPath = path.join(collectionDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the collection metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = remark().use(html, { sanitize: false }).processSync(matterResult.content);
  const contentHtml = processedContent.toString();
  const parsedLinkContentHTML = parseLinks(contentHtml);
  const returnObject = {
    id,
    contentHtml: parsedLinkContentHTML,
    ...(matterResult.data as { date: Date; title: string }),
  };

  // Combine the data with the id and contentHtml
  return returnObject;
}

export async function getAllCollectionData(collectionPath: string) {
  const collectionDirectory = path.join(process.cwd(), collectionPath);
  const fileNames = fs.readdirSync(collectionDirectory);
  const pageDataList = [] as Array<{ date: string; name: string; id: string; contentHtml: string }>;
  for (const file of fileNames) {
    if (file == "index.md") {
      continue;
    }
    const fullPath = path.join(collectionDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the collection metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html, { sanitize: true }).process(matterResult.content);
    const contentHtml = processedContent.toString();
    const parsedLinkContentHTML = parseLinks(contentHtml);
    const pageData = {
      id: file.replace(/\.md$/, ""),
      contentHtml: parsedLinkContentHTML,
      ...(matterResult.data as { date: string; name: string }),
    };

    pageDataList.push(pageData);
  }
  return pageDataList;
}
