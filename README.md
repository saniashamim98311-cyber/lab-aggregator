# Lab Aggregator

A mini web app to search lab tests and health packages by test name and pincode, and compare prices across providers.

Live demo: PASTE-YOUR-LINK-HERE

## Tech Stack
Plain HTML/CSS/JS frontend and a Node.js serverless API (Vercel). I chose this because it needs no build step and deploys frontend and backend together.

## Features
- Filters providers by pincode
- Search returns matching single tests and packages that include the test
- Sorted by total price (offer price + home collection fee)
- Mobile-friendly cards with MRP strikethrough, price breakdown and NABL badge

## Run Locally
    git clone https://github.com/saniashamim98311-cyber/lab-aggregator
    cd lab-aggregator
    npx vercel dev

Then open http://localhost:3000

## API
GET /api/search?search_query=Lipid Profile&pincode=110001

## Thinking Question: Scraping Without Getting Blocked
I would first check whether the competitor offers an official API. If not, I would use a headless browser like Playwright with rotating proxies and realistic headers. I would add random delays and rate limits so the traffic looks human. I would cache results so I scrape less often. Finally, I would monitor for failures and layout changes so the scraper can be fixed quickly.
