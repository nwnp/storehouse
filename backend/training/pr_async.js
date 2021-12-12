// const condition = true;
// const promise = new Promise((res, rej) => {
//   if (condition) {
//     res("success");
//   } else {
//     rej("failed");
//   }
// })
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const condition = true;

const user = {
  id: "kikeea",
  name: "jin",
  password: "123",
  nickname: "nwnp",
};

// 기명함수
const signedFunction = () => {
  if (condition) {
    console.log(user.id);
  }
  return user.id;
};

// async/await 함수
const asyncFunction = async () => {
  const signed = await signedFunction();
  if (condition) {
    console.log(signed);
  }
};
asyncFunction();
