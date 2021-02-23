const path = require('path');
const rehype = require('remark-rehype')
const rehypeRaw = require('rehype-raw');
const stringify = require('rehype-stringify')
const images = require('@fec/remark-images')

const options = {
	enableRehype: false,
	plugins: [
		{
			plugin: images,
			options: {
				srcDir: path.join(__dirname, 'site/'),
				targetDir: path.join(__dirname, '_site/img'),
				imageSizes: [320, 640],
			}
		},
		{
			plugin: rehype,
			options: { 
				allowDangerousHtml: true 
			},
		},
		rehypeRaw,
		stringify,
	]
}

module.exports = options