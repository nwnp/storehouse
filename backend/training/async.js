/** 콜백함수 */
const findAndSaveUser = (users) => {
  users
    .findOne({})
    .then((user) => {
      user.name = "jin";
      return user.save();
    })
    .then((user) => {
      return users.findOne({ gender: "m" });
    })
    .then((user) => {
      console.log(`second user: ${user}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

/** async/await 문법 */
// async 문법은 catch 문법이 없기 때문에 에러를 잡을 코드가 없다
// 그래서 try ~ catch 문 사용
const asyncFunction = async (users) => {
  try {
    let user = await users.findOne({});
    user.name = "jin";
    user = await user.save();
    user = await users.findOne({ gender: "m" });
    console.log("success😁");
  } catch (error) {
    console.error(error);
  }
};
asyncFunction;
