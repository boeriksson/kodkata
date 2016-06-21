var var1 = 'kalle';

console.log('var11', var1);
function enFunktion() {
  var1 = 'adam';

  console.log('var12', var1);
  var var1 = 'kadaffi';  //Hoisting - declaration is moved to top of function, and then overridden by 'adam'
                         //Remove declaration and it is the variable in the outer scope that is modified..

}
console.log('var13', var1);

enFunktion();

console.log('var14', var1);
