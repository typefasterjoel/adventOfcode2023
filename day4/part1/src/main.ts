async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const justNumbers = lines.map((line) => line.replace(/Card \d: /, ""));
  const winningNumbers = justNumbers.map((line) => line.split("|")[0].trim());
  const myNumbers = justNumbers.map((line) => line.split("|")[1].trim());

  let winningMatches: string[][] = [];

  myNumbers.forEach((myNumber, index) => {
    const numbers = myNumber.split(" ").filter((num) => num !== "");
    const matches = numbers.filter((num) =>
      winningNumbers[index]
        .split(" ")
        .filter((wn) => wn !== "")
        .includes(num)
    );
    winningMatches.push(matches);
  });

  const tally = winningMatches.map((matches) => {
    let points = 0;
    if (matches.length > 0) {
      points = 1;
      for (let i = 1; i < matches.length; i++) {
        points = Math.pow(2, i);
      }
    }
    return points;
  });

  let result = tally.reduce((a, b) => a + b, 0);

  console.log(result);
}

main();
