
/* Create an array with values from 1 to 100

  Obs:
    1.) An array in js is just an object with indexnumbers as properties + a length prop
    2.) Array(x) creates an empty object with length prop set to X.. destructuring it will then create the indexes

*/
const theArray = [...Array(100)].map((_,ix) => ix)

console.log('Array: ', JSON.stringify(theArray));