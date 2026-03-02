const mergeWords = (word) => (next) =>
  next === undefined ? word : mergeWords(word + ' ' + next);

console.log(mergeWords('Hello')());
console.log(mergeWords('There')('is')('no')('spoon.')());