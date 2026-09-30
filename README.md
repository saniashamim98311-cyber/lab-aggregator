# Lab Aggregator

A mini web app to search lab tests and health packages by test name and pincode, and compare prices across providers.

## Run Locally
npm install
npm start
Open http://localhost:3000

## API
GET /api/search?search_query=Lipid Profile&pincode=110001

## Thinking Question: Scraping Without Getting Blocked
I would first check whether the competitor offers an official API. If not, I would use a headless browser like Playwright with rotating proxies and realistic headers. I would add random delays and rate limits so the traffic looks human. I would cache results so I scrape less often. Finally, I would monitor for failures and layout changes so the scraper can be fixed quickly.
