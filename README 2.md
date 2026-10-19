# Field Notes portfolio

A cinematic portfolio for biotechnology, cryo-electron microscopy, and web work, styled as a personal streaming catalogue. It includes a profile picker, featured opening, horizontal title rails, animated artwork, hover treatments, carousel controls, and chapter detail dialogs. The branding and artwork are original rather than reproducing another service's logo or assets.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static-file server. For example:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Personalize it

Edit the `portfolio` object near the top of `script.js`:

- Set `name`, `location`, and `email`.
- Replace the sample chapter detail text with real project summaries and outcomes.

Update the text in `index.html` to add your specific education, employment history, methods, software, links, and contact/social profiles. The current copy avoids making up project names, qualifications, or results.

## Design notes

- Responsive chapter cards, profile selection, detail dialogs, and keyboard dismissal.
- No framework or build step is required.
- Google Fonts are optional; system fallbacks are provided.
- Reduced-motion preferences are respected.
