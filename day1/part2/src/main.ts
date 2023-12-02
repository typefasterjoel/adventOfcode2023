async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const numberDictionary: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const reverseNumberDictionary: { [key: string]: number } = {
    eno: 1,
    owt: 2,
    eerht: 3,
    ruof: 4,
    evif: 5,
    xis: 6,
    neves: 7,
    thgie: 8,
    enin: 9,
  };

  const numbers = lines.map((line, index) => {
    // find the last match of a number word
    const findFirstNumber = line.match(
      /(one|two|three|four|five|six|seven|eight|nine|[1-9])/i
    )?.[0];

    const findLastNumber = line
      .split("")
      .reverse()
      .join("")
      .match(/(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[1-9])/i)?.[0];

    const firstNumber = numberDictionary[findFirstNumber!]
      ? `${numberDictionary[findFirstNumber!]}`
      : findFirstNumber!;
    const lastNumber = reverseNumberDictionary[findLastNumber!]
      ? `${reverseNumberDictionary[findLastNumber!]}`
      : findLastNumber!;

    const combined = firstNumber! + lastNumber!;

    // console.log(combined, `--- line: ${line} --- index: ${index + 1}`);
    console.log(combined);

    return parseInt(combined);
  });

  let result = numbers.reduce((a, b) => a + b, 0);

  console.log(result);
}

main();
