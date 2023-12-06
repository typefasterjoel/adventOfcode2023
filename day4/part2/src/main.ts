async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");
  const cards = lines.map((_, index) => `Card ${index + 1}`);
  const justNumbers = lines.map((line) => line.replace(/Card \d: /, ""));
  const winningNumbers = justNumbers.map((line) =>
    line
      .split("|")[0]
      .trim()
      .split(" ")
      .filter((num) => num !== "")
  );
  const myNumbers = justNumbers.map((line) =>
    line
      .split("|")[1]
      .trim()
      .split(" ")
      .filter((num) => num !== "")
  );

  let totalCards: number[] = Array(cards.length).fill(1);

  let winningMatches: string[][] = [];

  myNumbers.forEach((card, index) => {
    // console.log("------------------ card", index + 1, "------------------");
    let currentCards = 1;
    const matches = card.filter((num) => winningNumbers[index].includes(num));

    if (totalCards[index]) {
      currentCards = totalCards[index];
    }

    if (matches.length > 0) {
      for (let i = 1; i <= matches.length; i++) {
        totalCards[index + i] = totalCards[index + i] + currentCards;
      }
    }
    // console.log(totalCards, `---- Total Per Card ----`);

    // console.log(`---------------- Card ${index + 1} done ----------------`);
    // console.log("\n");

    winningMatches.push(matches);
  });

  // console.log(additionalCopies);

  // console.log(winningMatches);

  // const tally = winningMatches.map((matches) => {
  //   let points = 0;
  //   if (matches.length > 0) {
  //     points = 1;
  //     for (let i = 1; i < matches.length; i++) {
  //       points = Math.pow(2, i);
  //     }
  //   }
  //   return points;
  // });

  // let result = tally.reduce((a, b) => a + b, 0);

  console.log(totalCards.reduce((a, b) => a + b, 0));

  // console.log(cardCopies.join("\n"));
}

main();
