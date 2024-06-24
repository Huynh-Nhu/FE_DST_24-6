function GenerateRandomLetter(length) {
  let random = "";
  for (let i = 0; i < length; i++) {
    random += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return random;
}

module.exports = { GenerateRandomLetter };
