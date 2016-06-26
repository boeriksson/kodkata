describe('es6 generator test', () => {
  it('should yield increasing numbers', () => {
    function* generator() {
      let i = 0;
      while(i < 10) {
        yield i++;
      }
    }
    const gen = generator();
    expect(gen.next().value).to.equal(0);
    expect(gen.next().value).to.equal(1);
    expect(gen.next().value).to.equal(2);
    expect(gen.next().value).to.equal(3);
  });

  it('should return values according to order of encountered yields..', () => {
    function*  firstGenerator(i) {
      yield i;
      yield* secondGenerator(); //yield* is used to 'delegate' to another generator
      yield 222;
    }
    function* secondGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }

    const gen = firstGenerator(1);
    expect(gen.next().value).to.equal(1);
    expect(gen.next().value).to.equal(1);
    expect(gen.next().value).to.equal(2);
    expect(gen.next().value).to.equal(3);
    expect(gen.next().value).to.equal(222);
  });

  it('should ss', () => {
    function* firstGenerator() {
      yield* secondGenerator();
    }
    function* secondGenerator() {
      yield* [1, 2, 3]; // Here yield* delegates to iterable
    }

    const gen = firstGenerator();
    expect(gen.next().value).to.equal(1);
    expect(gen.next().value).to.equal(2);
    expect(gen.next().value).to.equal(3);
  });
});