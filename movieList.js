let axios = require('axios'); // HTTP client
let cheerio = require('cheerio'); // HTML parsing package
//let jsonframe = require('jsonframe-cheerio'); // a cheerio plugin I designed
let fs = require('fs'); // is included in node.js - you don't need to install it

axios.get('http://www.imdb.com/list/ls057008852/?ref_=tt_rls_1')
	.then((response) => {
		if(response.status === 200) {
			var html = response.data;
      let $ = cheerio.load(html); 
      var movies = [];
      $('.lister-item-content').each(function(i, elem) {

        movies[i] = {
          title: $(this).children('.lister-item-header').children('a').text(),
          year: $(this).children('.lister-item-header').children('.lister-item-year').text().replace(/\(|\)/g,''),
          rating: $('.ratings-imdb-rating').eq(i).text().trim()
        }
      });
      fs.writeFile('data/movies.json', 
        JSON.stringify(movies, null, 4), (err)=>{
        console.log('File successfully written!');
      })
		}
}, (error) => console.log(error));