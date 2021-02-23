const slug = require('./site/utils/filters/slug')
const eleventyRemark = require('@fec/eleventy-plugin-remark')
const remarkOptions = require('./site/utils/markdown/index.js')
const path = require('path');
const rehypeRaw = require('rehype-raw');
const remarkRehype = require('remark-rehype');
const rehypeStringify = require('rehype-stringify');

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig({
		notify: false,
		watch: true,
	})
	// eleventyConfig.setQuietMode(true);

	// eleventyConfig.setTemplateFormats(['html', 'md', 'njk', 'png', 'jpg', 'css'])

	// eleventyConfig.addPlugin(eleventyRemark, remarkOptions)

	eleventyConfig.addPlugin(eleventyRemark, {
		enableRehype: false,
		plugins: [
		  {
		    plugin: require('@fec/remark-images'),
		    options: {
		      srcDir: path.join(__dirname, 'site'),
		      targetDir: path.join(__dirname, '_site'),
		    },
		  },
		  {
			plugin: remarkRehype,
			options: { allowDangerousHtml: true },
		  },
		  rehypeRaw,
		  rehypeStringify,
		],
	  });

	eleventyConfig.addFilter('slug', slug)

	eleventyConfig.addPassthroughCopy('site/img/**/*.{gif,mp4}')

	return {
		dir: {
			input: "site",
		},
		markdownTemplateEngine: 'njk'
	}
}