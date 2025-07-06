const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout, } = require("cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");

setDefaultTimeout(70000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on page", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("user search by text", async function () {
  return await getText(this.page, "body main section:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
});

Then("user sees text {string}", async function (string) {
  const actual = await getText(this.page, "body main section:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
  const expected = await string;
  expect(actual).contains(expected);
});

When('user selects day and the time of the session', async function () {
  await clickElement(this.page,"a:nth-child(2)");
  await clickElement(this.page,".movie-seances__time[href='#'][data-seance-id='217']");
});

When('user book ticket', async function () {
  await clickElement(this.page, "div:nth-child(7) span:nth-child(2)");
  await clickElement(this.page, ".acceptin-button");
  await clickElement(this.page, ".acceptin-button");
});
         
Then('user sees booking {string}', async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected); 
});

When('user selects busy place', async function () {
  await clickElement(this.page,"a:nth-child(2)");
  await clickElement(this.page,".movie-seances__time[href='#'][data-seance-id='217']");
  await clickElement(this.page, "span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken");
});

 Then('the book button is not active', async function () {
  const isDisabled = await this.page.$eval(".acceptin-button", (button) => {
  return button.disabled;
  });
  expect(true).equals(isDisabled);
  
});





// //When('user click by link media netology', async function () {
//            // Write code here that turns the phrase above into concrete actions
//   return await clickElement(this.page, "a[class='styles_link__v0kWZ']");
// });
         
// //Then('user sees text {string}', async function (string) {
//            // Write code here that turns the phrase above into concrete actions
//   const actual = await getText(this.page, "div[class='hidden w-36 text-base opacity-80 md:block']");
//   const expected = await string;
//   expect(actual).contains(expected);
// });
