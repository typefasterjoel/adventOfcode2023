async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const numberDictionary: { [key: string]: string } = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
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
    // find all possible numbers in the line
    const regex = /(one|two|three|four|five|six|seven|eight|nine|[1-9])/gi;
    let matches: string[] = [];

    for (let i = 0; i < line.length; i++) {
      const substring = line.substring(i);
      const match = substring.match(regex);
      if (match) {
        matches = matches.concat(match);
      }
    }

    // convert all words to numbers
    matches = matches.map((match) => {
      if (numberDictionary[match]) {
        return numberDictionary[match].toString();
      } else {
        return match;
      }
    });

    const firstNumber = matches[0];
    const lastNumber = matches[matches.length - 1];

    const combined = firstNumber! + lastNumber!;

    console.log(combined);

    return parseInt(combined);
  });

  let result = numbers.reduce((a, b) => a + b, 0);

  console.log(result);
}

main();
