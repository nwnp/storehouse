const num1 = 1;
console.log(num1);

const num2 = 2;
console.log(num2);

console.log(num1 + num2);
console.log(num1 - num2);

const str1 = "안녕하세요";
console.log(str1);

const str2 = "반갑습니다";
console.log(str2);

const myName = "jin jeong woo";
const str3 = `안녕하세요 저는 ${myName}입니다`;
console.log(str3);

function func1() {
  console.log("함수 func1 입니다");
}
func1();

function func2() {
  return "함수 func2 입니다";
}
console.log(func2());

func3 = () => 20;
func4 = () => 30;

console.log(func3() + func4());
console.log(func3() - func4());

func5 = () => {
  const num1 = func3();
  const num2 = func4();
  return num1 - num2;
};

console.log(func5());

const arr1 = [1, 2, 3, 4];
console.log(arr1);

arr1.push(5);
console.log(arr1);
arr1.pop();
console.log(arr1);

const arr2 = [5, 6, 7, 8];
console.log(arr2);
arr2.push(9);
console.log(arr2);
arr2.pop();
console.log(arr2);

const person = {
  name: "jin",
  age: "28",
  birthday: "940418",
  func: function func() {
    return "객체안에 함수";
  },
  arr: [1, 2, 3],
  ob: { name: "객체안에 객체" },
};
console.log(person);

console.log(person.name);
console.log(person.age);
console.log(person.birthday);

console.log(person.arr[0]);
console.log(person.arr[1]);
console.log(person.arr[2]);

console.log(person.func());
console.log(person.ob);
console.log(person.ob.name);

console.log(person.arr.pop(1));
