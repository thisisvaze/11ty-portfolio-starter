const { DateTime } = require("luxon");
const navigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
const rssPlugin = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  //Add image support

  // works also with addLiquidShortcode or addJavaScriptFunction
  eleventyConfig.addNunjucksAsyncShortcode(
    "myResponsiveImage",
    async function (src, alt, padding) {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
      }
      let outputFormat = "webp";
      let stats = await Image(src, {
        widths: [null],
        formats: ["webp"],
        urlPath: "/img/",
        outputDir: "./dev/img/",
      });
      let lowestSrc = stats[outputFormat][0];
      let sizes = "100vw"; // Make sure you customize this!
      // Iterate over formats and widths
      return `<picture>
      ${Object.values(stats)
        .map((imageFormat) => {
          return `  <source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat
            .map((entry) => `${entry.url} ${entry.width}w`)
            .join(", ")}" sizes="${sizes}">`;
        })
        .join("\n")}
        <img
          src="${lowestSrc.url}"
          width="${lowestSrc.width}"
          style="height:30vh; object-fit:cover;overflow: hidden;"
          class="w-100"
          loading="lazy"
          decoding="async"
          alt="${alt}">
      </picture>`;
    }
  );

  // works also with addLiquidShortcode or addJavaScriptFunction
  eleventyConfig.addNunjucksAsyncShortcode(
    "myBlogImage",
    async function (src, alt) {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
      }
      let outputFormat = "webp";
      let stats = await Image(src, {
        widths: [1024],
        formats: ["webp"],
        urlPath: "/img/",
        outputDir: "./dev/img/",
      });
      let lowestSrc = stats[outputFormat][0];
      let sizes = "100vw"; // Make sure you customize this!
      // Iterate over formats and widths
      return `<picture>
      ${Object.values(stats)
        .map((imageFormat) => {
          return `  <source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat
            .map((entry) => `${entry.url} ${entry.width}w`)
            .join(", ")}" sizes="${sizes}">`;
        })
        .join("\n")}
        <img
          src="${lowestSrc.url}"
          width="${lowestSrc.width}"
          class="w-100  col-8"
          loading="lazy"
          decoding="async"
          alt="${alt}">
      </picture>`;
    }
  );

  eleventyConfig.addNunjucksAsyncShortcode(
    "myProfilePhoto",
    async function (src, alt) {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
      }
      let outputFormat = "webp";
      let stats = await Image(src, {
        widths: [1024],
        formats: ["webp"],
        urlPath: "/img/",
        outputDir: "./dev/img/",
      });
      let lowestSrc = stats[outputFormat][0];
      let sizes = "100vw"; // Make sure you customize this!
      // Iterate over formats and widths
      return `<picture>
      ${Object.values(stats)
        .map((imageFormat) => {
          return `  <source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat
            .map((entry) => `${entry.url} ${entry.width}w`)
            .join(", ")}" sizes="${sizes}">`;
        })
        .join("\n")}
        <img
          src="${lowestSrc.url}"
          width="100%"
          style="height:15vh; object-fit:contain; overflow: hidden;width:100%"
          alt="${alt}">
      </picture>`;
    }
  );
  // Add a filter using the Config API
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.setBrowserSyncConfig({
    reloadDelay: 400,
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("yyyy-LL-dd");
  });
  return {
    dir: {
      input: "src",
      output: "dev",
    },
  };
};
