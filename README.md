# NutriGuide

A static, patient-facing nutrition education website.

## Run locally
Because content is loaded from `data/content.json`, serve the folder over HTTP rather than opening `index.html` directly.

```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deploy
This site has no build step or backend. Upload the folder to GitHub Pages, Netlify, Cloudflare Pages, AWS S3/CloudFront, or any static host.

## Edit content
Most patient-facing text and references live in `data/content.json`. Layout/styles are in `css/styles.css`; rendering is in `js/site.js`.

## Medical content note
Clinical guidance changes. Re-review medical claims and links periodically and before using the site in a clinical workflow. This site is educational and not a substitute for individualized medical advice.

## Lifestyle & Weight update
A new `lifestyle.html` page includes an evidence-backed weight-loss guide, Mifflin-St Jeor calorie calculator, health-outcome explanations, practical food modifications, example purchasable tools, and primary/trusted source links. The visual refresh adds responsive photography throughout the home and lifestyle pages.

## Repository connection test
ChatGPT write access confirmed on September 9, 2026.
