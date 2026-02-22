function isAnagram(str1, str2) {
  const format = (str) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '')
      .split('')
      .sort()
      .join('');

  return format(str1) === format(str2);
}


console.log(isAnagram("Astronomer", "Moon starer"));
console.log(isAnagram("School master", "The classroom"));
console.log(isAnagram("The Morse Code", "Here come dots"));
console.log(isAnagram("Hello", "World"));