#!/usr/bin/env node
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(args) {
    var client, subdomainData, subdomain, subdomains;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = new _netlify2.default(args.accessToken);
            subdomainData = _fs2.default.readFileSync(args.subdomainFile);
            subdomain = JSON.parse(subdomainData);
            subdomains = [];


            subdomain.forEach(function (alias) {
              var normalizedAlias = alias.split(" ").join("-").toLowerCase();
              subdomains.push(normalizedAlias + "." + args.mainDomain);
            });

            client.updateSite({
              site_id: args.siteId,
              body: { domain_aliases: subdomains }
            }).then(function (response) {
              console.log(response);
              process.stdout.write("successfully updated domain aliases on Netlify.");
            }).catch(function (error) {
              process.stdout.write(error);
              process.exit(1);
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _netlify = require("netlify");

var _netlify2 = _interopRequireDefault(_netlify);

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = _yargs2.default.usage("Usage: $0 [options]").env("NETLIFY").option("a", {
  alias: "accessToken",
  description: "The Netlify access token to use the Netlify API.",
  demandOption: true
}).option("f", {
  alias: "subdomainFile",
  description: "Path to JSON file, which contains the subdomain the netlify site should have.",
  demandOption: true,
  default: "./subdomain.json"
}).option("m", {
  alias: "mainDomain",
  description: "The main domain you want to create subdomain within.",
  demandOption: true
}).option("s", {
  alias: "siteId",
  description: "The site Id to add the subdomain to on Netlify.",
  demandOption: true
}).help("h").alias("h", "help").argv;

main(args).then(function (response) {
  process.stdout.write("HELLO");
}).catch(function (error) {
  process.stdout.write(error);
  process.exit(1);
});