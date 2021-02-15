let arrA = [1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1];
let res = arrA.filter((it) => arrB.includes(it));
console.log("res" + JSON.stringify(res));
