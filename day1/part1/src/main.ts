async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const numbers = lines.map((line) => {
    const numbersOnlyFromLine = line
      .split("")
      .filter((car) => (parseInt(car) >= 0 ? parseInt(car) : false));

    const firstNumber = numbersOnlyFromLine[0];
    const lastNumber = numbersOnlyFromLine[numbersOnlyFromLine.length - 1];
    const combined = firstNumber + (lastNumber ? lastNumber : firstNumber);

    const newNum = parseInt(combined);

    return newNum;
  });

  let result = numbers.reduce((acc, cur) => acc + cur, 0);

  console.log(result);
}

main();
