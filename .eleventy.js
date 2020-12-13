const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// export all this
module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("assets");

  // https://www.11ty.dev/docs/collections/#advanced%3A-custom-filtering-and-sorting
  // https://github.com/11ty/eleventy/issues/411 (answer)
  eleventyConfig.addCollection("aboutAscending", function(collection) {
    return collection.getFilteredByGlob("src/2020/aboutThumbCollection/*.md").sort((a, b) => {
      // console.log("sortName a & b:", a.data.sortName, b.data.sortName); // , b);
      if (a.data.sortName > b.data.sortName) return -1;
      else if (a.data.sortName < b.data.sortName) return 1;
      else return 0;
    })
  });

  eleventyConfig.addCollection("aboutAscending2021", function(collection) {
    return collection.getFilteredByGlob("src/2021/aboutThumbCollection/*.md").sort((a, b) => {
      // console.log("sortName a & b:", a.data.sortName, b.data.sortName); // , b);
      if (a.data.sortName > b.data.sortName) return -1;
      else if (a.data.sortName < b.data.sortName) return 1;
      else return 0;
    })
  });  

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "_site",
      includes: "includes"
    }
  }
}
