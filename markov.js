/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    // console.log(text);
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    const uniqueWords = [...new Set(this.words)]; //remove duplicate words
    uniqueWords.forEach( val => {
      let chainWords = [];

      this.words.forEach( (val2,idx) => { 
        if (this.words[idx - 1] == val && idx > 0) {
          chainWords.push(val2);
        }
      })

      chains[val] = chainWords;
    })
    for (let key in chains) { //if word has no chain options, set to null
      if (chains[key][0] === undefined){
        chains[key][0] = null;
      }
    }
    return chains
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const chains = this.chains;
    let firstWord = this.words[Math.floor(Math.random() * this.words.length)];
    while (!chains[firstWord][0]) {
      firstWord = this.words[Math.floor(Math.random() * this.words.length)];
    } // ensuring first word of text has options for chaining
    let currWord;
    let nextWord;
    let text = [firstWord];
    for (let x = 1; x < numWords; x++) {
      if (x == 1) {
        currWord = firstWord;
      }
      nextWord = chains[currWord][Math.floor(Math.random() * chains[currWord].length)];
      while (x + 1 < numWords && !chains[nextWord][0]) {
        nextWord = chains[currWord][Math.floor(Math.random() * chains[currWord].length)];
      } // ensuring next word has chaining options if not last word
      text.push(nextWord);
      currWord = nextWord;
    }
    // console.log(text.join(' '));
    return text.join(' ');
  }
}

module.exports = { MarkovMachine };