# Pedro Lobato — Portfolio

Personal portfolio for **Pedro Luis Lobato Barros**, Software Developer (SRE & Core Logic Lead at Duppla). Built with Vue 3, Vite, and Tailwind CSS, deployed to GitHub Pages.

## Stack

- **Vue 3** (Composition API, `<script setup>`, TypeScript strict mode)
- **Vite** for dev/build, **vue-tsc** for type checking
- **Tailwind CSS** with class-based dark mode
- EN / ES language toggle (`useI18n` composable, persisted to `localStorage`)
- IntersectionObserver-driven scroll reveals, subtle hero parallax
- GitHub Actions → GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (usually `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview   # serves dist/ locally
```

## Updating content

All copy lives in a single file: [`src/data/profile.ts`](./src/data/profile.ts).

Every user-facing string is typed as `BilingualText` (`{ en, es }`) so the same source drives both languages. It exports:

- `profile` — name, bilingual title/subtitle/tagline/bio, links, vanity handles.
- `experience` — timeline entries with bilingual summaries, highlight labels, and details.
- `projects` — project cards with bilingual titles/descriptions, tags, and optional link.
- `skills` — skill groups with bilingual group names.
- `education` — schools with bilingual degree, period, and coursework label.
- `ui` — shared section headings, CTAs, and toggle labels (EN/ES).

Edit, save, and the site updates. No component changes required for typical content tweaks.

The CV PDF is served from `public/Pedro_Lobato_CV.pdf` — drop a replacement there to update the resume download.

## Theme

`useTheme()` (in `src/composables/useTheme.ts`) handles the light/dark toggle. It:

1. Reads `localStorage.theme` if the user has chosen one.
2. Otherwise, follows `prefers-color-scheme`.
3. Persists the user's manual choice.

An inline script in `index.html` sets the initial `dark` class before first paint to avoid FOUC.

## Language toggle

`useI18n()` (in `src/composables/useI18n.ts`) mirrors the theme composable: `locale` is a `Ref<'en' | 'es'>`, `toggle()` flips it, and `t(text)` resolves a `BilingualText` to the current locale. State persists to `localStorage.locale` and is reflected on `<html lang>`.

## Animations

- Sections fade + translate up as they scroll into view via `useReveal()` (IntersectionObserver wrapper).
- Timeline entries, project cards, skill groups, and contact cards reveal sequentially via `.reveal-stagger` CSS.
- Hero has a soft gradient blob that translates at ~0.3× scroll speed, throttled with `requestAnimationFrame`. Disabled on mobile and when `prefers-reduced-motion` is set.
- Theme-toggle icon rotates + fades on change; locale toggle highlights the active language.

All animations respect `prefers-reduced-motion: reduce` and fall back to instant reveals.

## LinkedIn avatar — weekly sync via GitHub Actions

Calling the LinkedIn API directly from the browser is not viable: it requires OAuth 2.0 and blocks CORS, and exposing a `client_secret` in a static site is a security risk. Instead, the avatar is refreshed **once a week in CI** and committed to the repo.

How it works:

1. `.github/workflows/update-avatar.yml` runs every Monday (and on manual dispatch).
2. It executes `scripts/fetch-linkedin-avatar.mjs`, which calls `GET /v2/me` with the `r_liteprofile` scope using the `LINKEDIN_ACCESS_TOKEN` repository secret.
3. It picks the largest `profilePicture` element and writes it to `public/avatar.jpg`.
4. If the file changed, the workflow commits it back to `main` (triggering the normal Pages deploy).
5. `useLinkedInAvatar()` probes `<base>/avatar.jpg` at runtime and swaps it in if present; otherwise it keeps the bundled SVG monogram at `src/assets/avatar.svg`.

### Why not just `client_id` + `client_secret`?

LinkedIn's `client_credentials` grant only works for B2B APIs (Marketing, Ads). **Profile data — including your avatar — requires a user access token** obtained through the 3-legged OAuth authorization-code flow, which means a one-time browser consent step. There is no way around this.

### Setup (one-time)

1. **Register a LinkedIn app** at <https://www.linkedin.com/developers/>.
2. On the app's **Products** tab, request **"Sign In with LinkedIn using OpenID Connect"** (grants the `openid profile email` scopes — `picture` is returned by `/v2/userinfo`).
3. On the **Auth** tab, add the redirect URL `http://localhost:53682/callback`.
4. Copy the **Client ID** and **Primary Client Secret** into a local `.env` (see `.env.example`):
   ```
   LINKEDIN_CLIENT_ID=...
   LINKEDIN_CLIENT_SECRET=...
   ```
   `.env` is gitignored — it stays on your machine.
5. Run the one-time helper:
   ```bash
   node scripts/linkedin-auth.mjs
   ```
   A browser opens, you consent, and the script prints an `access_token` (valid ~60 days) and possibly a `refresh_token` (only if your app has Marketing Developer Platform access — most personal apps do not).
6. Store the token(s) as **repository secrets** (Settings → Secrets and variables → Actions):
   ```bash
   gh secret set LINKEDIN_ACCESS_TOKEN --body "<paste>"
   # If a refresh_token was issued:
   gh secret set LINKEDIN_REFRESH_TOKEN --body "<paste>"
   gh secret set LINKEDIN_CLIENT_ID     --body "<paste>"
   gh secret set LINKEDIN_CLIENT_SECRET --body "<paste>"
   ```
7. From the Actions tab, run **"Update LinkedIn avatar"** manually to seed `public/avatar.jpg`.

### What's required vs. optional

| Secret | Required? | Purpose |
|---|---|---|
| `LINKEDIN_ACCESS_TOKEN` | **Yes** (if no refresh token) | Direct bearer token; ~60-day life |
| `LINKEDIN_CLIENT_ID` | Only with refresh flow | App identifier |
| `LINKEDIN_CLIENT_SECRET` | Only with refresh flow | Used to exchange refresh → access |
| `LINKEDIN_REFRESH_TOKEN` | Optional | Enables auto-renewal; only granted to MDP-tier apps |

If only `LINKEDIN_ACCESS_TOKEN` is set, the workflow uses it directly and you rotate manually every ~60 days. If all four refresh-flow secrets are set, the workflow mints a fresh access token on every run and effectively never expires.

No client secret ever touches the frontend. If nothing is configured or the call fails, the script exits cleanly and the committed image (or SVG fallback) remains.

## Deployment

GitHub Actions workflow at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. Triggers on push to `main` (or manual dispatch).
2. Installs deps with `npm ci` on Node 20.
3. Calls `actions/configure-pages` to compute the correct base path (`/my-page/` for a project site).
4. Injects that path as `VITE_BASE` and runs `npm run build`.
5. Uploads `dist/` as a Pages artifact.
6. Deploys via `actions/deploy-pages@v4`.

To enable:

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`.

### Custom domain

If you add a custom domain, the workflow still works — `configure-pages` returns `/` as the base path when a custom domain is configured.

## Project structure

```
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── avatar.jpg            # written weekly by update-avatar.yml (optional)
│   └── Pedro_Lobato_CV.pdf
├── scripts/
│   └── fetch-linkedin-avatar.mjs
└── src/
    ├── App.vue
    ├── main.ts
    ├── style.css
    ├── assets/
    │   └── avatar.svg
    ├── components/
    │   ├── ContactSection.vue
    │   ├── EducationSection.vue
    │   ├── ExperienceTimeline.vue
    │   ├── HeroSection.vue
    │   ├── LocaleToggle.vue
    │   ├── ProjectsGrid.vue
    │   ├── SkillsCloud.vue
    │   └── ThemeToggle.vue
    ├── composables/
    │   ├── useI18n.ts
    │   ├── useLinkedInAvatar.ts
    │   ├── useReveal.ts
    │   └── useTheme.ts
    └── data/
        └── profile.ts
```

## Notes / decisions

- **Fully bilingual.** Every user-facing string is a `BilingualText` in `profile.ts`. Components resolve via `t(text)` from `useI18n`. The `<html lang>` attribute updates with the selected locale.
- **Projects reflect the CV.** Cards cover the Real Estate Evaluator, Client Evaluator, Contract Automation Engine, Security Framework 2.0, plus public academic repos.
- **No external icon or animation library.** SVGs are inlined; reveals use a tiny IntersectionObserver composable. Bundle stays lean.
- **Single Google Font family** (Inter + JetBrains Mono) loaded with `preconnect` + `display=swap` for fast first paint.
- **Motion is opt-out.** Everything respects `prefers-reduced-motion: reduce`.
