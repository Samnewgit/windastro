# Astrology Analysis Web App

## Setup

### Prerequisites
- Node.js installed
- Cloudflare account with Pages enabled

### Environment Variables
Set the following in Cloudflare Pages (Settings > Environment Variables):

```
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### Local Development
Install Wrangler and run local dev server:

```bash
npm install -g @cloudflare/wrangler
wrangler pages dev --port 8787
```

### Deployment to Cloudflare Pages
1. Push this repo to GitHub.
2. In Cloudflare Pages, create a new project and connect to your GitHub repo.
3. Build command: *None* (static)
4. Output directory: `/`
5. Add `DEEPSEEK_API_KEY` env var as above.

### Usage
Open the site in browser, fill in birth details, and click **Analyze** to generate astrological analysis.
