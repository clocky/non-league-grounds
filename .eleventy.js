require('dotenv').config();

module.exports = function(eleventyConfig) {
  return {
    templateFormats: [
        "md",
        "njk"
    ],
    pathPrefix: "/",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "public"
    }
  } 
}
