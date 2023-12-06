import { lookup } from "dns";

type AdjacentSymbol = {
  adjacentSymbol: string;
  row: number;
  column: number;
};

type Numbers = {
  line: number;
  indexes: number[];
  number: string;
};

type Symbols = {
  line: number;
  characterIndex: number;
  symbol: string;
};

type Adjacents = {
  adjacentNumber: AdjacentSymbol[];
  symbol: string;
};

type Lookups = string;

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

  const lookups: Numbers[] = [];

  let numbers: Numbers[] = [];

  let symbols: Symbols[] = [];

  let foundAdjacentNumbers: Adjacents[] = [];

  const findNumbers = (character: number, indexes: number[]) => {
    return (
      indexes.includes(character - 1) ||
      indexes.includes(character) ||
      indexes.includes(character + 1)
    );
  };

  lines.forEach((line, lineIndex) => {
    const onlySymbolRegex = /[^\w\d\s\.]/g;
    const onlySymbols = line.match(onlySymbolRegex);
    const onlyNumbers = line.match(/\d+/g);

    if (onlyNumbers) {
      onlyNumbers.forEach((number) => {
        const lengthOfNumber = number.length;
        const startNumber = line.indexOf(number);
        const indexes = Array.from({ length: lengthOfNumber }, (_, i) => {
          return startNumber + i;
        });

        numbers.push({
          line: lineIndex,
          indexes,
          number,
        });
      });
    }

    if (!onlySymbols) return;

    onlySymbols.forEach((symbol) => {
      const lastSymbol = symbols?.[symbols.length - 1];
      let startIndex = 0;
      if (!!lastSymbol && lastSymbol?.line == lineIndex) {
        startIndex = lastSymbol.characterIndex + 1;
      }
      const symbolIndex = line.indexOf(symbol, startIndex);
      symbols.push({
        line: lineIndex,
        characterIndex: symbolIndex,
        symbol,
      });
    });
  });

  symbols.forEach((symbol) => {
    const { line, characterIndex, symbol: symbolFound } = symbol;

    //  check top line
    if (line != 0) {
      lookups.push(
        ...numbers.filter((num) => {
          return (
            num.line === line - 1 && findNumbers(characterIndex, num.indexes)
          );
        })
      );
    }
    // check same line
    lookups.push(
      ...numbers.filter((num) => {
        return num.line === line && findNumbers(characterIndex, num.indexes);
      })
    );

    //  check bottom line
    if (line != lines.length - 1) {
      lookups.push(
        ...numbers.filter((num) => {
          return (
            num.line === line + 1 && findNumbers(characterIndex, num.indexes)
          );
        })
      );
    }

    // const adjacentNumbers: AdjacentSymbol[] = coords
    //   .map((coord) => {
    //     const [y, x] = coord;
    //     const adjacentSymbol = lines[line + y]?.[characterIndex + x];
    //     return {
    //       adjacentSymbol,
    //       row: line + y,
    //       column: characterIndex + x,
    //     };
    //   })
    //   .filter((symbol) => symbol.adjacentSymbol !== ".");

    // foundAdjacentNumbers.push({
    //   adjacentNumber: adjacentNumbers,
    //   symbol: symbolFound,
    // });
  });

  // foundAdjacentNumbers.forEach((foundNum) => {
  //   const { adjacentNumber, symbol } = foundNum;

  //   adjacentNumber.forEach((adjacent) => {
  //     const { row, column } = adjacent;
  //     const numberFound = numbers.find((number) => {
  //       const { indexes, line } = number;
  //       const found = indexes.includes(column) && row === line;
  //       return found;
  //     });

  //     if (!numberFound) return;
  //     lookups.push(numberFound.number);
  //   });
  // });

  // console.log(foundAdjacentNumbers);

  console.log(
    lookups.sort((a, b) => a.line - b.line).map((lookup) => lookup.number)
  );

  console.log(
    lookups
      .map((lookup) => Number(lookup.number))
      .reduce((acc, curr) => acc + curr, 0)
  );

  // let result = lookups
  //   .map((lookup) => parseInt(lookup))
  //   .reduce((acc, curr) => acc + curr, 0);

  // console.log(result);
}

main();
