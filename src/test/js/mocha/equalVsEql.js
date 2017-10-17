describe('equal vs eql', () => {
  const obj1 = {
    id: '1',
    name: 'annica'
  };
  const obj2 = {
    id: '1',
    name: 'annica'
  };
  const obj3 = {
    id: '2',
    children: [
      { id: '1', name: 'child1', pet: obj1 },
      { id: '2', name: 'child2' }
    ]
  };
  const obj4 = {
    id: '2',
    children: [
      { id: '1', name: 'child1', pet: obj2 },
      { id: '2', name: 'child2' }
    ]
  };

  it('should equal same object true', () => {
    expect(obj1).to.equal(obj1);
  });

  it('should equal diffrent, but similar objects false', () => {
    expect(obj1).to.not.equal(obj2);
  });

  it('should eql diffrent, but similar objects true', () => {
    expect(obj1).to.eql(obj2);
  });

  it('should eql nested objects', () => {
    expect(obj3).to.eql(obj4);
  });

  it('should not eql nested objects with difference high', () => {
    obj4.children.splice(1,1);
    expect(obj3).to.not.equal(obj4);
  });
});