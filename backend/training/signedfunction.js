let ramenList = "";

const addSamyang = (name) => {
  ramenList = name;
  console.log(ramenList);
  setTimeout(addShin, 500, "신라면");
};

const addShin = (name) => {
  ramenList += ", " + name;
  console.log(ramenList);
  setTimeout(addJin, 500, "진라면");
};

const addJin = (name) => {
  ramenList += ", " + name;
  console.log(ramenList);
  setTimeout(addNuguri, 500, "너구리");
};

const addNuguri = (name) => {
  ramenList += ", " + name;
  console.log(ramenList);
};

// addSamyang("삼양라면")
setTimeout(addSamyang, 500, "삼양라면");
