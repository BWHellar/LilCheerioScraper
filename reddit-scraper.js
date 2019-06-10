// This scraper will go through Reddit news.
//jquery implementation of Node. Great for selecting DOM elements
const cheerio = require('cheerio');
// Node library good for controlling Chromium functionality
const puppeteer = require('puppeteer');
// This is where we want to target our scraper
const url = 'https://www.reddit.com/r/news/';
// Fire up Puppeteer and target it at the a browser.
puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    const newsHeadlines = [];
    // Reddit is dynamically generates their headlines so it was found that they contain them in h2 tags.  For the sake of this webscraper I want to scrape all h2 tags then to gather the headlines.
    $('a[href*="/r/news/comments"] > h2').each(function() {
      newsHeadlines.push({
        title: $(this).text(),
      });
    });

    console.log(newsHeadlines);
  })
  .catch(console.error);
