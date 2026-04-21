# hello-react-gh-pages

React SPA deployed to **GitHub Pages** as a zero-cost static CDN, with a serverless AWS Lambda backend provisioned via Terraform.

Live: https://considerable.github.io/hello-react-gh-pages/

---

## What This Is

A production pattern for serving a React frontend from GitHub Pages while calling a serverless AWS Lambda API — no S3, no CloudFront, no hosting bill.

This is the open-source reference implementation of the GitHub Pages CDN pattern I used at **Thrive Audio LLC** to deliver static assets and documentation without external hosting infrastructure.

**Stack:**
- React (Create React App) — frontend
- GitHub Actions — CI/CD: build, test, deploy to GitHub Pages on every push to `main`
- GitHub Pages — static asset hosting / CDN
- AWS Lambda (Python) — serverless API backend
- Terraform — Lambda + IAM provisioned as code

---

## How It Works

```
Push to main
     │
     ▼
GitHub Actions (deploy.yml)
     │  npm ci → npm run build → upload artifact
     ▼
GitHub Pages
     │  serves build/ as static CDN
     ▼
Browser → React SPA → calls Lambda Function URL
                              │
                              ▼
                        AWS Lambda (Python)
                        provisioned by Terraform
```

---

## GitHub Actions Deploy Workflow

`.github/workflows/deploy.yml` — triggers on every push to `main`:

1. Checkout + Node 20 setup with npm cache
2. `npm ci` — clean install
3. `npm run build` — production React build with `PUBLIC_URL` set for GitHub Pages subpath
4. Upload build artifact via `actions/upload-pages-artifact`
5. Deploy to GitHub Pages via `actions/deploy-pages` with OIDC-based permissions (no tokens stored)

---

## AWS Backend

`aws/main.tf` — Terraform provisions:
- IAM role with least-privilege Lambda execution policy
- Lambda function (Python 3.11, 10s timeout)
- Lambda Function URL with CORS headers (no API Gateway needed)

`aws/lambda_function.py` — Python handler returns JSON response with CORS headers.

> **Note:** The backend is already deployed and live at `https://dmqqfwxqwjya6jkwx3u5j2yw240wxuzo.lambda-url.us-west-2.on.aws/`. Running `terraform apply` will attempt to create duplicate resources. Import existing state first with `terraform import` if you want to manage it via Terraform.

---

## GitHub Pages as CDN — Why It Works

GitHub Pages serves from a global CDN (Fastly). For static frontends, documentation, and asset delivery it is functionally equivalent to S3 + CloudFront at zero cost. The tradeoff: public repos only, 1GB size limit, 100GB/month bandwidth.

For Thrive Audio, this pattern eliminated the need for a separate hosting infrastructure for static content while keeping deployment fully automated through GitHub Actions.

---

## Local Development

```bash
npm install
npm start        # http://localhost:3000
npm test
npm run build
```
