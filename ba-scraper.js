const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.beeradvocate.com/lists/top/'

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function(){
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    const topBeers = [];
    $('a[href*="/beer/profile"] > b').each(function(){
      topBeers.push({
        Beers: $(this).text(),
      });
    });

    console.log(topBeers);
  })
  .catch(console.error);
