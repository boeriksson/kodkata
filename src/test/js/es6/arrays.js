
describe('es6 array tests', () => {
  describe('Arrays', () => {
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
});