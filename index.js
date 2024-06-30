import { xmlToJsonUtil } from "xml-to-json-util";
import { puppeeterBlogFromUrls, puppeteerBlog } from "./modules/puppeeter/blog.js";
import { getBlogByUrl } from "./modules/data/blog.js";
import 'dotenv/config';

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return xmlToJsonUtil(data);
};

const blogScrapper = async () => {
    const data = await fetchData("https://www.papyhappy.fr/sitemap-blog-pages.xml");
    puppeeterBlogFromUrls(data.urlset.url);
};

const main = async () => {
    await blogScrapper();
};

main();