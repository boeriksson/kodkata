
describe('es6 array tests', () => {
  describe('#includes', () => {
    const strArray = ['annica', 'anna', 'ida', 'rose'];
    const objArray = [
      { id: 1, name: 'linda' },
      { id: 2, name: 'marie' },
      { id: 3, name: 'anki' }
    ];

    it('should test if element exists in array - includes ', () => {
      // String can be matched on immediatly
      expect(strArray.includes('ida')).to.equal(true);

      // Similar objects are not matched on..
      var searchElement = { id: 2, name: 'marie' };
      expect(objArray.includes(searchElement)).to.equal(false);

      // The same object is matched on..
      expect(objArray.includes(objArray[1])).to.equal(true);
    });
  });

  describe('#reduce', () => {
    it('should return the sum of the array', () => {
      expect([0, 1, 2, 3, 4].reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      })).to.equal(10);
    });

    it('should return the sum of the array plus initial value', () => {
      expect([0, 1, 2, 3, 4].reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      }, 10)).to.equal(20);
    });

    it('should flatten an array of arrays', () => {
      const flatten = [[0,1], [2,3], [4,5]].reduce((a, b) => a.concat(b));
      expect(flatten).to.eql([0,1,2,3,4,5]);
    });
  });
});