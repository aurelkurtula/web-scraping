let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('https://www.goodreads.com/review/list/4039932?shelf=read')
	.then((response) => {
		if(response.status === 200) {
			var html = response.data;
      let $ = cheerio.load(html); 
      var books = [];
      $('.bookalike').each(function(i, elem) {
        books[i] = {
          title: $(this).children('.title').children('.value').text()
								 .replace(/(\r\n|\n|\r)/gm,"")
								 .trim(),
          author: $(this).children('.author').children('.value').text()
								 .replace('*', '')
								 .split(',')
								 .reverse()
								 .map(name => name.trim())
								 .join(' '),
          page_num: $(this).children('.num_pages').children('.value').text().split('pp')[0].trim(),
          rating: $(this).children('.avg_rating').children('.value').text().trim()
        }
      });
      fs.writeFile('data/books.json', 
        JSON.stringify(books, null, 4), (err)=>{
        console.log('File successfully written!');
      })
		}
}, (error) => console.log(error));
  