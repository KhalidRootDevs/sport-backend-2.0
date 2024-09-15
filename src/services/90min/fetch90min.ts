import { JSDOM } from 'jsdom';
import { getSlugify } from '../../utils/helper';

const getDom = async (url: string) => {
  try {
    let dom: any = await fetch(url);
    dom = await dom.text();
    dom = new JSDOM(dom);
    dom = dom.window.document;
    return dom;
  } catch (e) {
    console.error(e);
    return 'exit';
  }
};

const extractNewsDetails = (dom: any) => {
  let news = '';
  const newsBody = dom.getElementsByClassName('wrapper_wfxu5h')[0].children[0].children[0];

  // Remove unnecessary figure element
  const figureElements = newsBody.querySelectorAll('figure');
  figureElements.forEach((figure: any) => {
    figure.parentNode.removeChild(figure);
  });

  const newsParagraphs = newsBody.getElementsByTagName('p');

  for (let i = 0; i < newsParagraphs.length; i++) {
    news += `<p>${newsParagraphs[i].innerHTML}</p>`;
  }

  news = news.replace(/<a[^>]*>(.*?)<\/a>/g, '$1'); // remove <a/> tag

  return news;
};

const fetch90min = async (category: any) => {
  const currentDate = new Date();
  const targetTimestamp = new Date(currentDate).setDate(currentDate.getDate() - 1);
  let currentPage = 1;

  const fetchedNews: any = [];

  try {
    const processArticle = async (article: any) => {
      let news: any = {};
      const newsTimestamp = article.getElementsByTagName('time')[0].getAttribute('datetime');

      if (new Date(newsTimestamp).getDate() < targetTimestamp) {
        return 'exit';
      }

      news.published = new Date(newsTimestamp).getTime() / 1000;
      news.status = true;
      news.title =
        article.getElementsByTagName('h3')[0]?.textContent ||
        article.getElementsByTagName('h2')[0]?.textContent;

      const newsLink = article.getElementsByTagName('a')[0].href;
      const newsDetails = await getDom(newsLink);

      news.image = newsDetails
        .getElementsByTagName('picture')[0]
        ?.getElementsByTagName('img')[0].src;
      news.description = extractNewsDetails(newsDetails);
      news.slug = `${getSlugify(news.title)}-${getSlugify(category?.type)}`;
      news.source_type = 'others';
      news.source_name = '90min';
      news.categoryId = category?.id;
      news.category = category?.name;
      news.categoryImage = category?.logo;
      news.categoryType = category?.type;
      news.url = newsLink;

      fetchedNews.push(news);
    };

    const processArticles = async (articles: any) => {
      const promises = articles.map((article: any) => processArticle(article));
      const res = await Promise.all(promises);

      if (res.includes('exit')) return 'exit';
    };

    while (true) {
      // exit if url is not from 90min.com
      if (!category?.newsSource?.startsWith('https://www.90min.com/')) return fetchedNews;

      let dom = await getDom(`${category.newsSource}?page=${currentPage}`);
      if (dom === 'exit') return [];

      const articles = Array.from(dom.getElementsByTagName('article'));
      if (!articles.length || articles.length === 0) return [];

      const result = await processArticles(articles);
      if (result === 'exit') {
        return fetchedNews;
      } else {
        currentPage++;
      }
    }
  } catch (e) {
    console.error(e);
    return fetchedNews;
  }
};

export default fetch90min;
