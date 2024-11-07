const {MarkovMachine} = require('./markov');

describe("MarkovMachine", function () {

    let mm;

    beforeAll(function () {
      //create MM instance 
      mm = new MarkovMachine("the cat in the hat");
    });
  
    test("creates correct word chains", function () {
      expect(mm.chains['the']).toContain('hat');
      expect(mm.chains['the']).toContain('cat');
      expect(mm.chains['cat']).toContain('in');
      expect(mm.chains['hat']).toContain(null);
    });
  
    test("generated text is numWords long", function () {
      let wordArr = mm.makeText().split(/\s+/);
      expect(wordArr.length).toBe(100);
      wordArr = mm.makeText(numWords=50).split(/\s+/);
      expect(wordArr.length).toBe(50);
      wordArr = mm.makeText(numWords=3).split(/\s+/);
      expect(wordArr.length).toBe(3);
    
    });
  });