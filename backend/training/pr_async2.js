function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function process() {
  console.log("hi");
  await sleep(1000);
  console.log("second");
  await sleep(1000);
  console.log("third");
  await sleep(1000);
}
process().then(() => {
  console.log("work is finished");
});
