# Saudi National Day Carousel Storybook

GitHub: [farhat-baaroun/saudi-national-day-carousel-storybook](https://github.com/farhat-baaroun/saudi-national-day-carousel-storybook)

Independent Storybook for [`saudi-national-day-carousel` on npm](https://www.npmjs.com/package/saudi-national-day-carousel).

Stories call `SaudiNationalDayCarousel.mount()` after loading the published UMD from **jsDelivr** (default) or **unpkg**. Four option stories map to two motion variants and three asset sets (figures, photo deck, pattern slides, pattern deck). The **Portal template** stories compose a home page inspired by [dev-dga-templates](https://github.com/DevDhaif/dev-dga-templates) and replace that template's hero with this carousel. Independent, not affiliated with the DGA. The Locale toolbar remounts the widget with `lang`, `dir`, and `mount({ locale })`.

The widget is **client-side only**. Laravel, ASP.NET, Odoo, Vue, and Angular can still host it by rendering a sized `div` and calling `mount()` in the browser. Integration recipes: [carousel README](https://github.com/farhat-baaroun/saudi-national-day-carousel#client-side-only-csr).

```bash
npm install
npm run storybook
```

```bash
npm run build-storybook
```

Vercel serves `storybook-static`.
