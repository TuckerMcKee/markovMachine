/** Command-line tool to generate Markov text. */
const markov = require('./markov');
const axios = require('axios');
const fs = require('fs');

async function getUrlString(url) { 
    try {
        const res = await axios.get(url);
        return res.data
    } catch (error) {
        console.error("Error fetching URL:", error);
        return null;
    }
}



async function makeText() {
    let text;
    let mm;
    switch(process.argv[2]) {
        case 'file':
            text = fs.readFile(process.argv[3],'utf-8', (err,data) => {
                if (err) {
                   console.log(err);
                   process.kill(1); 
                }
                return data
            });
            mm = markov.MarkovMachine(text);
            mm.makeText();
            break;
        case 'url':
            text = await getUrlString(process.argv[3]);
            mm = markov.MarkovMachine(text);
            mm.makeText();
            break;    
    }
    
}

makeText();