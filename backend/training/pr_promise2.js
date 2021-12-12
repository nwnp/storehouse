let condition = true;
let count = 0;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    count++;
    console.log(count);
    resolve("success😇");
  } else {
    reject("failed🤬");
  }
})
  .then((message) => {
    return new Promise((resolve, reject) => {
      count++;
      console.log(count);
      resolve(message);
    });
  })
  .then((message) => {
    console.log(message);
    return new Promise((resolve, reject) => {
      count++;
      console.log(count);
      resolve(message);
    });
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("always🤨");
  });
