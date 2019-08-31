require('dotenv').config();
const pretty = require('pretty');

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("pretty", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let prettified = pretty(content, {
        ocd: true,
      });
      return prettified;
    }
    return content;
  });
  
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
