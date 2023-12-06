import { lookup } from "dns";

async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const coords = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
    [1, 1], // down right
    [-1, 1], // up right
    [1, -1], // down left
    [-1, -1], // up left
  ];

  const lookups = new Set<string>();
  let numbers = new Set<{
    line: number;
    indexes: number[];
    number: string;
  }>();

  let symbols = new Set<{
    line: number;
    characterIndex: number;
    symbol: string;
  }>();

  let foundAdjacentNumbers = new Set<{
    adjacentNumber: string[];
    line: number;
    symbol: string;
  }>();

  lines.forEach((line, lineIndex) => {
    const onlySymbolRegex = /[^\d\s\.]/gi;
    const onlySymbols = line.match(onlySymbolRegex);

    const onlyNumbers = line.match(/\d+/g);

    if (onlyNumbers) {
      onlyNumbers.forEach((number) => {
        const lengthOfNumber = number.length;
        const startNumber = line.indexOf(number);
        const indexes = Array.from({ length: lengthOfNumber }, (_, i) => {
          return startNumber + i;
        });

        numbers.add({
          line: lineIndex,
          indexes,
          number,
        });
      });
    }

    if (!onlySymbols) return;

    onlySymbols.forEach((symbol) => {
      const symbolIndex = line.indexOf(`${symbol}`);
      symbols.add({
        line: lineIndex,
        characterIndex: symbolIndex,
        symbol,
      });
    });

    symbols.forEach((symbol) => {
      const { line, characterIndex, symbol: symbolFound } = symbol;

      const adjacentNumbers = coords
        .map((coord) => {
          const [y, x] = coord;
          const adjacentSymbol = lines[line + y]?.[characterIndex + x];
          return adjacentSymbol;
        })
        .filter((symbol) => symbol !== ".");
      foundAdjacentNumbers.add({
        adjacentNumber: adjacentNumbers,
        line: line,
        symbol: symbolFound,
      });
    });

    foundAdjacentNumbers.forEach((foundNum) => {
      const numDicLookup = Array.from(numbers).find((number) => {
        const { indexes, line } = number;
        let found = false;
        foundNum.adjacentNumber.forEach((adjacentNumber) => {
          const foundIndex = index
          if (foundIndex !== -1) found = true;
        });

        return found;
      })

    // coords.forEach((coord) => {
    //   const [y, x] = coord;
    //   const adjacentSymbol = lines[lineIndex + y]?.[symbolIndex + x];
    //   if (!isNaN(Number(adjacentSymbol))) {
    //     // Find the number correspondant to that symbol found
    //     const foundLine = lineIndex + y;
    //     const lineToLookup = lines[foundLine];
    //     const characterLocation = lineToLookup.indexOf(adjacentSymbol);
    //     console.log({ characterLocation, foundLine, adjacentSymbol });

    //     const numberFound = Array.from(numbers).find((number) => {
    //       const { indexes, line } = number;
    //       const found =
    //         indexes.includes(characterLocation) && lineIndex + y === line;
    //       if (found) {
    //         // console.log(
    //         //   found,
    //         //   number.number,
    //         //   characterLocation,
    //         //   indexes,
    //         //   line
    //         // );
    //       }
    //       return found;
    //     });

    //     if (!numberFound) return;
    //     lookups.add(`${numberFound.number} ${symbol}`);
    //   }
    // });
  });

  // console.log(Array.from(symbols));
  console.log(Array.from(foundAdjacentNumbers));
  // console.log(Array.from(numbers));
  // console.log(Array.from(lookups));

  let result = "";

  console.log(result);
}

main();
