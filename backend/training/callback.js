const wait_count = (callback) => {
  callback();
};

const count3 = () => console.log("three");

wait_count(count3);
