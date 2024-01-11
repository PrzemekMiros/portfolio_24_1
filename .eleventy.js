const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const Image = require('@11ty/eleventy-img');
const codeStyleHooks = require("eleventy-plugin-code-style-hooks");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/img"); 
    eleventyConfig.addPassthroughCopy("src/content/blog/img");
    eleventyConfig.addPassthroughCopy("src/content/realizacje/img");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/static");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addWatchTarget("src/assets/sass");

    eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

        // Date
        eleventyConfig.addFilter('dateDisplay', require('./src/filters/date-display.js'));
        eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    
        // Collections blog
        eleventyConfig.addCollection('posts', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/content/blog/**/*.md').reverse();
        });
    
        // Collections portfolio
        eleventyConfig.addCollection('works', (collection) => {
          const works = collection.getFilteredByGlob('src/content/realizacje/**/*.md').reverse();
          return works.sort((a, b) => {
            const orderA = a.data.order || 0; // Ustawiamy domyślną wartość na wypadek braku pola order
            const orderB = b.data.order || 0;
            return orderA - orderB;
          });
        });
        

        // Collections services
        eleventyConfig.addCollection('services', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/content/uslugi/**/*.md').reverse();
        });

        // Collections products
        eleventyConfig.addCollection('products', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/content/produkty/**/*.md').reverse();
        });

        // Collection faq
        eleventyConfig.addCollection("faq", function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/content/faq/**/*.md');
        });

        // Collections towns
        eleventyConfig.addCollection('towns', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/content/miasta/**/*.md').reverse();
        });

        eleventyConfig.addNunjucksAsyncShortcode('Image', async (src, alt) => {
          if (!alt) {
            throw new Error(`Missing \`alt\` on Image from: ${src}`);
          }
      
          let stats = await Image(src, {
            widths: [25, 320, 640, 960, 1200, 1800, 2400],
            formats: ['jpeg', 'webp'],
            urlPath: '/assets/img/',
            outputDir: './public/assets/img/',
          });
      
          let lowestSrc = stats['jpeg'][0];
          let blurUpSrc = stats['jpeg'][1];
      
          const srcsetWebp = stats['webp'].map(entry => `${entry.url} ${entry.width}w`).join(', ');
          const srcsetJpeg = stats['jpeg'].map(entry => `${entry.url} ${entry.width}w`).join(', ');
      
          const sizes = '(max-width: 320px) 280px, (max-width: 640px) 600px, (max-width: 960px) 920px, 100vw';
      
          const source = `<source type="image/webp" srcset="${srcsetWebp}">`;
      
          const img = `<img
            loading="lazy"
            alt="${alt}"
            src="${lowestSrc.url}"
            data-src="${lowestSrc.url}" 
            data-srcset="${srcsetJpeg}" 
            sizes="${sizes}"
            srcset="${srcsetJpeg}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}"
            style="background-image: url('${blurUpSrc.url.replace('/320/', '/25/')}'); background-color: transparent; background-size: cover;"  
          >`;
      
          return `<div class="image-wrapper"><picture>${source}${img}</picture></div>`;
        });
  
  
        eleventyConfig.addNunjucksAsyncShortcode('blogImage', async (src, alt) => {
          if (!alt) {
            throw new Error(`Missing \`alt\` on myImage from: ${src}`);
          }
      
          let stats = await Image(src, {
            widths: [25, 320, 640, 960, 1200, 1800, 2400],
            formats: ['jpeg', 'webp'],
            urlPath: '/content/blog/img/',
            outputDir: './public/content/blog/img/',
          });
      
          let lowestSrc = stats['jpeg'][0];
          let blurUpSrc = stats['jpeg'][1];
      
          const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
              ...acc,
              [format]: stats[format].reduce(
                (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                '',
              ),
            }),
            {},
          ); 
      
          const source = `<source type="image/webp" srcset="${srcset['webp']}" >`;
      
          const img = `<img
            loading="lazy"
            alt="${alt}"
            src="${lowestSrc.url}"
            data-src="${lowestSrc.url}" 
            data-srcset="${srcset['jpeg']}" 
            sizes='(min-width: 1024px) 1024px, 100vw'
            srcset="${srcset['jpeg']}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}"
            style="background-image: url('${blurUpSrc.url.replace('/320/', '/25/')}'); background-color: transparent; background-size: cover;"  
            >`;
      
          return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
        });
  

        eleventyConfig.addNunjucksAsyncShortcode('workImage', async (src, alt) => {
          if (!alt) {
            throw new Error(`Missing \`alt\` on myImage from: ${src}`);
          }
      
          let stats = await Image(src, {
            widths: [25, 320, 640, 960, 1200, 1800, 2400],
            formats: ['jpeg', 'webp'],
            urlPath: '/realizacje/img/',
            outputDir: './public/realizacje/img/',
          });
      
          let lowestSrc = stats['jpeg'][0];
          let blurUpSrc = stats['jpeg'][1];
      
          const srcset = Object.keys(stats).reduce(
            (acc, format) => ({
              ...acc,
              [format]: stats[format].reduce(
                (_acc, curr) => `${_acc} ${curr.srcset} ,`,
                '',
              ),
            }),
            {},
          ); 
      
          const source = `<source type="image/webp" srcset="${srcset['webp']}" >`;
      
          const img = `<img
            loading="lazy"
            alt="${alt}"
            src="${lowestSrc.url}"
            data-src="${lowestSrc.url}" 
            data-srcset="${srcset['jpeg']}" 
            sizes='(min-width: 1024px) 1024px, 100vw'
            srcset="${srcset['jpeg']}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}"
            style="background-image: url('${blurUpSrc.url.replace('/320/', '/25/')}'); background-size: cover;"  
            >`;
      
          return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
        });
  
        

      // Code blocks
      eleventyConfig.addPlugin(codeStyleHooks, {
        colorPreviews: true,
        defaultLanguage: 'js',
        highlightSyntax: true,
        languageLabels: true,
        lineNumbers: true,
        markdownTrimTrailingNewline: true,
        prism: function(prism) {
          prism.languages.example = {
            tokenname: /\w+/i
          }
        }, 
      });


    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: "public",
        includes: "includes"
      }
    }
  };
