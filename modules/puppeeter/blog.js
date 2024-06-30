import puppeteer from "puppeteer";
import { insertBlogData } from "../data/blog.js";

export const puppeteerBlog = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    const data = await page.evaluate(() => {
        const headerIntro = document.querySelector('.page-blog__header__intro.text-muted').innerText;
        const title = document.querySelector('.page-blog__header h1').innerText;
        const articleElement = document.querySelector('article.page-blog__content');
        const articleContent = articleElement.innerText;
        return {
            url: document.URL,
            title,
            headerIntro,
            articleContent,
            articleElement: articleElement.innerHTML
        };
    });
    console.log(data)
    await browser.close();
    return data;
};

export const puppeeterBlogFromUrls = async (urls) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const data = [];
        for (const url of urls) {
                await page.goto(url.loc);
                const blog = await page.evaluate(async () => {
                    const headerIntro = document.querySelector('.page-blog__header__intro.text-muted').innerText;
                    const title = document.querySelector('.page-blog__header h1').innerText;
                    const articleElement = document.querySelector('article.page-blog__content');
                    const articleContent = articleElement.innerText;
                    return {
                        url: document.URL,
                        title,
                        headerIntro,
                        articleContent,
                        articleElement: articleElement.innerHTML
                    };
                });
                console.log('inserting', blog);
                // TODO : Insert into databases
                // await insertBlogData(blog);
                data.push(blog);
            }
            await browser.close();
            return data;
    } catch (error) {
        console.log(error)
    }
}
