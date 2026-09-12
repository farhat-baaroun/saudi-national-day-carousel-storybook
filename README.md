# Saudi National Day Carousel Storybook

GitHub: [farhat-baaroun/saudi-national-day-carousel-storybook](https://github.com/farhat-baaroun/saudi-national-day-carousel-storybook)

Independent Storybook app for [`saudi-national-day-carousel`](https://github.com/farhat-baaroun/saudi-national-day-carousel).

Stories live in `stories/` and mount the published UMD (`SaudiNationalDayCarousel.mount()`), not the library source.

## Local workspace

From the monorepo root:

```bash
npm install
npm run build
npm run storybook
```

Storybook serves the sibling package’s UMD at `/umd/saudi-national-day-carousel.umd.js`.

## After npm publish

In **Fit Lab**, switch **UMD source** to jsDelivr or unpkg, or open the **From jsDelivr** story.
