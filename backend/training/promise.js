let ramenList = "";
new Promise((resolve, reject) => {
  let name = "삼양라면";
  if (name == "삼양라면") {
    resolve(name);
  } else {
    reject("실패");
  }
})
  .then((result) => {
    ramenList += result;
    console.log(ramenList);
    return new Promise((resolve) => {
      resolve("진라면");
    }).then((result) => {
      ramenList += ", " + result;
      console.log(ramenList);
      return new Promise((resolve) => {
        resolve("신라면");
      }).then((result) => {
        ramenList += ", " + result;
        console.log(ramenList);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("무조건");
  });
