# eleventy-plugin-external-links

Eleventy plugin to make all external links open securely in a new tab

```shell script
npm install -D eleventy-plugin-external-links
```

Then simply add it to you eleventy config

```js
const externalLinks = require('eleventy-plugin-external-links')

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(externalLinks, {
        // Plugin defaults:
        name: 'external-links',         // Plugin name
        regex: /^(([a-z]+:)|(\/\/))/i,  // Regex that test if href is external
        target: "_blank",               // 'target' attribute for external links
        rel: "noopener",                // 'rel' attribute for external links
        extensions: [".html"],          // Extensions to apply transform to
        includeDoctype: true,           // Default to include '<!DOCTYPE html>' at the beginning of the file
    })
}
```

Under the hood it adds a simple transform that:

1. Checks the file extension
2. Parses the file using [node-html-parser](https://www.npmjs.com/package/node-html-parser)
3. Finds all the `<a />` tags which `href` matches regex
4. Add `target` and `rel` attributes to the elements
5. Return the content with '<!DOCTYPE html>' added at the beginning of the file as default

The default regex will detect links as follows:

| Link | External |
| ---- | -------- |
| http://google.com | ✔ |
| https://google.com | ✔ |
| //google.com | ✔ |
| mailto:mail@example.com | ✔ |
| /about |  ❌ |
| image.jpg |  ❌ |
| #anchor |  ❌ |
