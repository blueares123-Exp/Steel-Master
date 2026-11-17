# SteelBook — steel weight, price and section handbook

A single-page web app that works on phones, tablets and desktop browsers, and can be installed like an app. No build step, no server, no dependencies.

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `prices.txt` | Your prices — edit in Notepad |
| `manifest.json`, `icon-192.png`, `icon-512.png` | Make the site installable (name and icons) |
| `sw.js` | Lets the app work offline |

## What is inside

- **Weight & price calculator** — plate, flat, round, square and hex bar, pipe/CHS, square and rectangular tube, angle, channel, I/H beam, tee and rebar. mm or inch input, any length, quantity, material density, wastage, VAT and price.
- **Section database** — 2,271 sections: European (IPE, HEA, HEB, HEM, IPN, HD, HP, UPN, UPE, angles, CHS, SHS, RHS), British (UB, UC, UBP) and American AISC (W, S, M, HP, C, MC, L, HSS, Pipe) with mass, dimensions, area, I, W and surface area.
- **Estimate** — collect items into a priced list; copy to Excel or download CSV.
- **Tools** — length ⇄ weight, rebar, paint quantity, unit converter, cutting-list optimiser.
- **Reference** — formulas, densities, EN 10025 and ASTM grades, plate weights, rebar and gauge tables.
- **Prices** — rates loaded from `prices.txt`, editable per device, with per tonne / kg / metre / sheet entry, a rate converter, currency and VAT.
- **Cutting optimisers** — bar cutting lists and sheet nesting.
- **Phone / Browser toggle** in the header (Auto follows the screen size), plus light and dark mode.

## Deploy on GitHub Pages

1. Create a new repository on GitHub (for example `steelbook`).
2. Upload all seven files to the repository root, with exactly these names: `index.html`, `prices.txt`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `README.md` (Add file → Upload files → Commit).
3. Open **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After about a minute the site is live at `https://<your-username>.github.io/steelbook/`.

You can also just double-click `index.html` to run it offline.

## Updating prices with `prices.txt`

The site reads `prices.txt` (next to `index.html`) every time it is opened, so changing that one file changes the prices for everyone.

1. Open `prices.txt` in Notepad. Each line is `name = price unit`, for example:
   - `plate = 3.00 /kg` — a whole product group, per kg or per tonne (`/t`)
   - `IPE300 = 135.20 /m` — one exact section, per metre
2. Change the numbers, set the `updated = ...` line to today's date, and save.
3. On GitHub open the repository, click **Add file -> Upload files**, drop in the new `prices.txt`, and press **Commit changes**. (Or open `prices.txt` on GitHub, click the pencil icon, edit it there and commit.)
4. After about a minute, refresh the site. The **Prices** tab shows the date from the file and lists any line it could not understand.

Rules: prices are in AED excluding VAT; a section name must match the name shown in the section database; a section with no line of its own uses its product-group rate; a rate typed on a device overrides the file on that device until **Reset my device changes** is pressed. If `prices.txt` is missing the site falls back to built-in indicative rates. The file is only read when the site is served from GitHub Pages (or any web server) — not when `index.html` is opened by double-click.

## Installing it as an app

Open the site in Chrome or Edge and use **Install** (in the bar at the top of the page, the address bar, or the browser menu). On iPhone use Safari -> Share -> **Add to Home Screen**. The site keeps working in a normal browser tab as well.

Once it has been opened online, the app works with no connection. When online it always loads the newest `index.html` and `prices.txt`; offline it uses the last copy it saw.

## Data sources and accuracy

Section geometry comes from open-source datasets (`structuralcodes`, `eurocodepy`, and the AISC shapes table shipped with `steelpy`). Masses for European and British sections are computed from nominal geometry at 7,850 kg/m³, so they can differ from mill tables in the last digit. Always check against mill certificates and the governing standard before design or purchase.
