const addRamen = (name, prevName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let newName = "";
      if (prevName) {
        newName = `${prevName}, ${name}`;
      } else {
        newName = name;
      }
      console.log(newName);
      resolve(newName);
    }, 500);
  });
};

new Promise((resolve) => {
  resolve("data");
})
  .then((result) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 500);
    });
  })
  .then((result) => {
    console.log(result);
  });

addRamen("삼양라면")
  .then((ramenList) => addRamen("신라면", ramenList))
  .then((ramenList) => addRamen("진라면", ramenList))
  .then((ramenList) => addRamen("너구리", ramenList))
  .then((ramenList) => addRamen("열라면", ramenList));
