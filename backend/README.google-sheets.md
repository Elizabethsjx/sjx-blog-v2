# Google Sheets Integration (Daily Market Notes)

The site pulls your daily market notes from a **private** Google Sheet and
displays them as date-grouped cards. Your sheet stays private — the backend
reads it via a Google Cloud **service account**, so you never expose the document.

## One-time setup

### 1. Create the service account

1. Go to the Google Cloud Console: <https://console.cloud.google.com/>
2. Create a new project (or select an existing one) — top project picker → **New project**.
3. Open **APIs & Services → Library** (`https://console.cloud.google.com/apis/library`).
4. Search for **"Google Sheets API"** and click **Enable**.
5. Open **APIs & Services → Credentials** (`https://console.cloud.google.com/apis/credentials`).
6. Click **+ Create Credentials → Service account**.
7. Give it a name (e.g. `blog-sheets-reader`), then click **Create and continue**.
   - You can skip the role/permission steps (viewer access is granted via sharing below) and click **Done**.
8. On the Credentials page, find the new service account → click its email address
   (or *Actions → Manage keys*).
9. Open the **Keys** tab → **Add Key → Create new key → JSON**. This downloads a
   `*.json` file.

### 2. Store the key (never commit it)

Move the downloaded JSON into this repo's ignored credentials folder:

```bash
mkdir -p backend/credentials
mv ~/Downloads/your-downloaded-key.json backend/credentials/service_account.json
```

> `backend/credentials/` is already listed in `.gitignore`, so this secret will
> never be committed.

### 3. Point the backend at the key

In `backend/.env`, set:

```env
GOOGLE_SERVICE_ACCOUNT_FILE=credentials/service_account.json
```

### 4. Share your sheet with the service account

1. Open your Google Sheet (the one at
   `1bq1tjRuTgi6yWJM9L2TwxXDxOSPa6-SFEgltw5yCbxA`).
2. Click **Share** (top-right).
3. Add the **service account email** (looks like
   `blog-sheets-reader@your-project.iam.gserviceaccount.com`) as a **Viewer**.
4. Click **Send**. No email is actually sent to the service account; access is
   granted instantly.

### 5. Verify

Restart the backend and hit the endpoint:

```bash
curl http://localhost:8000/api/daily-notes
```

You should see your notes as JSON. The homepage "Daily Market Notes" feed reads
this same endpoint.

## How it refreshes

- The backend caches the sheet for **60 minutes** by default
  (`SHEETS_CACHE_MINUTES` in `.env`). Change it to e.g. `15` for faster refreshes.
- The frontend re-fetches from the backend on each page load, so within a refresh
  window your clients always see recent data without you touching any code.

## Expected column layout

The first tab (rename it or set `GOOGLE_SHEET_NOTES_TAB`) should have these
headers in row 1:

| Date | Stock's Name | News Abstraction | Trend | Link |
|------|--------------|------------------|-------|------|

- `Date` — any reasonable format (e.g. `2026-09-18`, `18/09/2026`).
- `Stock's Name` — e.g. `AAPL — Apple Inc.`
- `News Abstraction` — your plain-language takeaway.
- `Trend` — free text; auto-classified as bullish/bearish/neutral for the badge
  (recognizes "up/bull/positive/buy" vs "down/bear/negative/sell", etc.).
- `Link` — optional URL; renders as a "Read more →" button.

Rows with an empty date are still shown, but sorted last.
