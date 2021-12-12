// const startAsync = (age) => {
//   return new Promise((resolve, reject) => {
//     if (age > 20) resolve();
//     else reject();
//   });
// };

const setTimeoutPromise = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
};

const startAsync = async (age) => {
  if (age > 20) return `${age} success`;
  else throw new Error(`${age} is not over 20`);
};

// setTimeout(() => {
//   const promise1 = startAsync(25);
//   promise1
//     .then((value) => {
//       console.log(value);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   const promise2 = startAsync(15);
//   promise2
//     .then((value) => {
//       console.log(value);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, 1000);

const startAsyncJobs = async () => {
  await setTimeoutPromise(1000);
  const promise1 = startAsync(25);
  try {
    const value = await promise1;
    console.log(value);
  } catch (err) {
    console.error(err);
  }
  const promise2 = startAsync(15);
  try {
    const value = await promise2;
    console.log(value);
  } catch (err) {
    console.error(err);
  }
};

startAsyncJobs();
