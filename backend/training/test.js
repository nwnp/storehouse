// const condition = !true;
// const promise = new Promise((resolve, reject) => {
//   if (condition) {
//     resolve("성공");
//   } else {
//     reject("실패");
//   }
// })
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   })
//   .finally(() => {
//     console.log("무조건");
//   });

const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("success😁");
  } else {
    reject("failed🤬");
  }
})
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("always🤨");
  });
