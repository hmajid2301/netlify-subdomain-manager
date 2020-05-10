![npm](https://img.shields.io/npm/v/netlify-subdomain-manager)

# Netlify Subdomain Manager

This CLI tool can be used to manage your subdomain aliases on Netlify using a JSON file as a
source of truth.

## Usage

You can the node script like so.

```
npm install netlify-subdomain-manager
netlify_subdomain_manager --help
```

### Example JSON file

Where the JSON file is just a list of subdomain aliases you want. These will be prepended
by the mainDomain. For example if the json file was like this:

```json
["abc", "xyz"]
```

and the main domain was `haseebmajid.dev` then we would create the following aliases
`abc.haseebmajid.dev` and `xyz.haseebmajid.dev`. It will also create the domain aliases
that begin with www so the 4 domain aliases created will be

- www.abc.haseebmajid.dev
- abc.haseebmajid.dev
- www.xyz.haseebmajid.dev
- xyz.haseebmajid.dev


### Args

```bash
netlify_subdomain_manager --help
Usage: src [options]

Options:
  --version                  Show version number                       [boolean]
  -a, --accessToken          The Netlify access token to use the Netlify API.
                                                                      [required]
  -f, --subdomainFile        Path to JSON file, which contains the subdomain the
                             netlify site should have.
                                                  [default: "./subdomains.json"]
  -m, --mainDomain           The main domain you want to create subdomain
                             within.                                  [required]
  -s, --siteId               The site Id to add the subdomain to on Netlify.
                                                                      [required]
  -h, --help                 Show help                                 [boolean]
```

### Docker

You can run the Docker container locally like so.

```bash
touch .env
docker run -rm -v ${PWD}/subdomains.json:/app/subdomains.json --env-file .env hmajid2301/netlify-subdomain-manager
```

or you can build it locally

```
npm run build
docker build -t netlify-subdomain-manager .
docker run -v ${PWD}/subdomains.json:/app/subdomain.json --env-file .env netlify-subdomain-manager
```

Where `.env` is like:

```.env
NETLIFY_ACCESS_TOKEN=xxxx
NETLIFY_SUBDOMAIN_FILE=/app/subdomain.json
NETLIFY_MAIN_DOMAIN=haseebmajid.dev
NETLIFY_SITE_ID=xxxxx
```

#### Site ID

You can find the site id in the "Site Information".

* Go to Netlify
* Click on your website
* Click on "Settings" 
* Copy "API ID" from within the "Site Information" panel

#### Access Token

You can create an access token like so:

* Go to Netlify
* Click on your avatar
* Click on "User Settings"
* Click on "Applications" (left panel)
* Click on "New access token" in "Personal access tokens"

Give the access token an appropriate name and copy it somewhere safe.

### .gitlab-ci.yml

You can also use it during CI/CD.

```yaml
edit-domains:netlify:
  stage: post-publish
  image:
    name: hmajid2301/netlify-subdomain-manager
    entrypoint: [""]
  variables:
    NETLIFY_ACCESS_TOKEN: ${ACCESS_TOKEN}
    NETLIFY_SUBDOMAIN_FILE: subdomain.json
    NETLIFY_MAIN_DOMAIN: haseebmajid.dev
    NETLIFY_SITE_ID: ${SITE_ID}
  script:
    - node /app/index.js
```

## Build Locally

You can run the script locally like so.

```bash
npm install
touch .env
source .env
npm run start
```