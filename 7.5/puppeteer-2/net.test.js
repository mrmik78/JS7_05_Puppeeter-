const { clickElement, putText, getText } = require("./lib/commands.js");
//const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("Let's go to the cinema", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  
  test("The first link of film ", async () => {
    const expected = "Сталкер(1979)";
    const actual = await getText(page, "body main section:nth-child(1) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
    expect(actual).toContain(expected);
  });


  test("Booking a ticket", async () => {
    const expected = "Электронный билет";
    await clickElement(page,"a:nth-child(2)");
    await clickElement(page,".movie-seances__time[href='#'][data-seance-id='217']");
    await clickElement(page, "div:nth-child(7) span:nth-child(7)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, ".acceptin-button");

    const actual = await getText(page, ".ticket__check-title");
    await expect(actual).toContain(expected);
     
  });

  test("Book button is not active", async () => {
  await clickElement(page, "a:nth-child(2)");
  await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']");
  await clickElement(page, "span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken");
  const isDisabled = await page.$eval(".acceptin-button", (button) => {
    return button.disabled;
  });
  expect(isDisabled).toBe(true);
  });   

 });
