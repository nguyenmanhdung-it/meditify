const router = require("express").Router();
const puppeteer = require("puppeteer");

const delay = (time: any) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

router.get(
  "/",
  async (
    req: { query: { website: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): any; new (): any };
        send: { (arg0: string): any; new (): any };
      };
    },
    next: any
  ) => {
    const website = req.query.website;

    if (!website) {
      const err = new Error("Required query website missing");
      return res.status(400).json({
        error: err.message,
      });
    }
    try {
      const browser = await puppeteer.launch();
      const registry: any = {};
      let queue = [website];

      const url = queue[queue.length - 1];
      console.log("current url", url);
      const page = await browser.newPage();
      await page.goto(url);
      await delay(4000);
      registry[url] = await page.$eval(
        "article",
        (el: { innerHTML: any }) => el.innerHTML
      );
      var footer = await page.$eval(
        "footer",
        (el: { innerHTML: any }) => el.innerHTML
      );
      queue.pop();
      console.log("queue length", queue);

      const hrefs = await page.$$eval("a", (anchorEls: any[]) =>
        anchorEls.map((a: { href: any }) => a.href)
      );

      const filteredHrefs = hrefs.filter(
        (href: string) =>
          href.startsWith(website) && registry[href] === undefined
      );
      const uniqueHrefs = [...new Set(filteredHrefs)];
      queue.push(...uniqueHrefs);
      queue = [...new Set(queue)];

      await page.close();

      browser.close();
      var str = registry[url].replaceAll(
        `miro.medium.com/max/700`,
        `miro.medium.com/max/1080`
      );
      str = str.replace(/<button[^>]*>/g, "");
      footer = "<footer>" + footer + "</footer>";
      return res.status(200).send(str + footer);
      // return res.status(200).send(html);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Something broke");
    }
  }
);
module.exports = router;
