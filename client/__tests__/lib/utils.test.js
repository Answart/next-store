import {
  objctsDiffer,
  getUniqKeyVals,
  getFltrdObjs,
  capWord,
  formatMoney,
  getPageTitleProps,
  getFilterProps,
  getCartTotals
} from '../../lib/utils';
import product, {
  variant,
  variants,
  products,
  user,
  user_two,
  cart
} from '../../lib/dummyData';


describe('Util functions', () => {

  describe('capWord fn', () => {
    it('string word(s) input returns trimmed string with capitalized first word', () => {
      expect(capWord('word')).toEqual('Word');
      expect(capWord(' string')).toEqual('String');
      expect(capWord('wonderful!')).toEqual('Wonderful!');
      expect(capWord('hello there!')).toEqual('Hello there!');
    });

    it(`int input returns stringified version of int`, () => {
      expect(capWord(3)).toEqual('3');
      expect(capWord(1234)).toEqual('1234');
    });

    it(`string input with ints as first 'word' returns trimmed string with unchanged chars`, () => {
      expect(capWord('5')).toEqual('5');
      expect(capWord(' 8')).toEqual('8');
      expect(capWord('6 string')).toEqual('6 string');
      expect(capWord(`${8} string`)).toEqual('8 string');
    });
  });
});
