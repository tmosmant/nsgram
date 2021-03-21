require("dotenv").config();

const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function run() {
  const data = await fetch(process.env.URL);
  const html = await data.text();

  const { window } = new JSDOM(html);
  const $ = require("jquery")(window);

  const nodes = $(".site-main .entry-title");
  const titles = nodes.map((i, node) => node.textContent);

  console.log(titles);
}

run().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
