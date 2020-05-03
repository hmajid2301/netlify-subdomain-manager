#!/usr/bin/env node

import fs from "fs";
import NetlifyAPI from "netlify";
import yargs from "yargs";

async function main(args) {
  const client = new NetlifyAPI(args.accessToken);
  const subdomainData = fs.readFileSync(args.subdomainFile);
  const subdomain = JSON.parse(subdomainData);
  const subdomains = [];

  subdomain.forEach((alias) => {
    const normalizedAlias = alias
      .split(" ")
      .join("-")
      .toLowerCase();
    subdomains.push(`${normalizedAlias}.${args.mainDomain}`);
  });

  client
    .updateSite({
      site_id: args.siteId,
      body: { domain_aliases: subdomains },
    })
    .then((response) => {
      process.stdout.write(
        `successfully updated domain aliases on Netlify, for ${response.name}.`
      );
    })
    .catch((error) => {
      process.stderr.write(error);
      process.exit(1);
    });
}

const args = yargs
  .usage("Usage: $0 [options]")
  .env("NETLIFY")
  .option("a", {
    alias: "accessToken",
    description: "The Netlify access token to use the Netlify API.",
    demandOption: true,
  })
  .option("f", {
    alias: "subdomainFile",
    description:
      "Path to JSON file, which contains the subdomain the netlify site should have.",
    demandOption: true,
    default: "./subdomain.json",
  })
  .option("m", {
    alias: "mainDomain",
    description: "The main domain you want to create subdomain within.",
    demandOption: true,
  })
  .option("s", {
    alias: "siteId",
    description: "The site Id to add the subdomain to on Netlify.",
    demandOption: true,
  })
  .help("h")
  .alias("h", "help").argv;

main(args)
  .then(() => {
    process.stdout.write("Finished.");
  })
  .catch((error) => {
    process.stdout.write(error);
  });
