const {parse} = require('node-html-parser')
const {extname} = require('path')

module.exports = (eleventyConfig, userOptions = {}) => {
    const options = {
        name: 'external-links',
        regex: new RegExp('^(([a-z]+:)|(//))', 'i'),
        target: "_blank",
        rel: "noopener",
        extensions: [".html"],
        includeDoctype: true,
        ...userOptions
    }

    eleventyConfig.addTransform(options.extensions, (content, outputPath) => {
        if (outputPath && options.extensions.includes(extname(outputPath))) {
            const root = parse(content);
            const links = root.querySelectorAll("a");
            links.forEach((link) => {
                const href = link.getAttribute('href');
                if (href && options.regex.test(href)) {
                    link.setAttribute("target", options.target);
                    link.setAttribute("rel", options.rel);
                }
            });
            const newContent = root.toString();
            return options.includeDoctype ? `<!DOCTYPE html>${newContent}` : newContent;
        }
        return content;
    })
}

