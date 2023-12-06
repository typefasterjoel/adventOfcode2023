// coordinates are line (y) and character (x)

// const adjacentCoordinates = [
//   [0, 1], // right
//   [0, -1], // left
//   [1, 0], // below
//   [-1, 0], // above
//   [-1, -1], // diagonal above left
//   [-1, 1], // diagonal above right
//   [1, -1], // diagonal below left
//   [1, 1], // diagonal below right
// ];

// const allNumbers = lines
//   .map((line, index) => {
//     const numbers = line.match(/\d+/g);
//     const indexesOfEachNumberFound = numbers?.map((number) => {
//       const splitNumberIndexes = number.split("").map((n) => {
//         return line.indexOf(n);
//       });

//       return {
//         number,
//         line: index,
//         indexes: splitNumberIndexes,
//       };
//     });
//     return indexesOfEachNumberFound;
//   })
//   .flat()
//   .filter((number) => number);

// const allSymbols = lines
//   .map((line, index) => {
//     const symbolsOnlyRegex = /[^\w\d\s\.]/gi;
//     const onlySymbolsPerLine = line.match(symbolsOnlyRegex);
//     return {
//       line: index,
//       symbols:
//         onlySymbolsPerLine?.map((symbol) => ({
//           symbol,
//           index: line.indexOf(symbol),
//         })) ?? [],
//     };
//   })
//   .filter((symbol) => symbol.symbols.length > 0);

// let numbersFound: Array<{ number: string; line: number }> = [];

// allSymbols.forEach((symbol) => {
//   const { symbols, line } = symbol;

//   const foundNumbers: Array<{ line: number; character: number }> = [];

//   symbols.forEach((symbol) => {
//     const { index } = symbol;
//     adjacentCoordinates.forEach((coordinate) => {
//       const [y, x] = coordinate;
//       const adjacentSymbol = lines[line + y]?.[index + x];
//       if (Number(adjacentSymbol)) {
//         return foundNumbers.push({ line: line + y, character: index + x });
//       }
//     });
//   });

//   if (foundNumbers.length > 0) {
//     // Now we find if the coordinates have numbers
//     foundNumbers.forEach((coordinate) => {
//       const { line: y, character: x } = coordinate;

//       const findLine = allNumbers.find((number) => number?.line === y);
//       if (findLine && findLine?.line >= 0) {
//         const findNumber = findLine?.indexes.find((index) => index === x);
//         if (findNumber) {
//           numbersFound.push({
//             number: findLine.number,
//             line: findLine.line,
//           });
//         }
//       }
//     });
//   }
// });

// console.log(numbersFound.sort((a, b) => a.line - b.line));

// const numbersAdjacenttoSymbols = lines.map((line, index) => {
//   const symbolsOnlyRegex = /[^\w\d\s\.]/gi;
//   const onlySymbolsPerLine = line.match(symbolsOnlyRegex);
//   if (onlySymbolsPerLine) {
//     const indexLocationOfSymbols = onlySymbolsPerLine.map((symbol) => {
//       const index = line.indexOf(symbol);
//       return index;
//     });

//     // const lookAroundSymbol = indexLocationOfSymbols.map((index) => {
//     //   const adjacentSymbols = adjacentCoordinates
//     //     .map((coordinate) => {
//     //       const [x, y] = coordinate;
//     //       const adjacentSymbol = lines[index + x]?.[index + y];
//     //       if (Number(adjacentSymbol)) {
//     //         return {
//     //           adjacent: adjacentSymbol,
//     //           foundIn: [index + x, index + y],
//     //         };
//     //       } else {
//     //         return null;
//     //       }
//     //     })
//     //     .filter((symbol) => symbol);

//     //   return adjacentSymbols;
//     // });
//   }
// });

// const numberLocationInLine = lines.map((line, index) => {
//   // find index of a number in a line
//   const allNumbersInLine = line.match(/\d+/g);
//   const numberLocationInLine = allNumbersInLine?.map((number) => {
//     return {
//       number,
//       index: line.indexOf(number),
//     };
//   });

//   return {
//     line: index,
//     numbersInLine: numberLocationInLine,
//   };
// });

// const onlyNumbersNextToSymbols = numberLocationInLine.map((line) => {
//   const { numbersInLine, line: index } = line;
//   const symbolsOnlyRegex = /[^\w\d\s\.]/gi;

//   if (numbersInLine) {
//     const numbersAdjacentToSymbols = numbersInLine.filter((current) => {
//       const startOfNumber = current.index;
//       const endOfNumber = current.index + current.number.length - 1;

//       const hasSymbolAfterEndOfNumber = symbolsOnlyRegex.test(
//         lines[index][endOfNumber + 1]
//       );

//       const hasSymbolBeforeStartOfNumber = symbolsOnlyRegex.test(
//         lines[index][startOfNumber - 1]
//       );
//       const hasSymbolAboveStartOfNumber =
//         index > 0 && symbolsOnlyRegex.test(lines[index - 1][startOfNumber]);
//       const hasSymbolBelowStartOfNumber =
//         index < lines.length - 1 &&
//         symbolsOnlyRegex.test(lines[index + 1][startOfNumber]);
//       const hasSymbolAboveEndOfNumber =
//         index > 0 && symbolsOnlyRegex.test(lines[index - 1][endOfNumber]);
//       const hasSymbolBelowEndOfNumber =
//         index < lines.length - 1 &&
//         symbolsOnlyRegex.test(lines[index + 1][endOfNumber]);
//       const hasSymbolDiagonalAboveEndOfNumber =
//         index > 0 && symbolsOnlyRegex.test(lines[index - 1][endOfNumber + 1]);
//       const hasSymbolDiagonalBelowEndOfNumber =
//         index < lines.length - 1 &&
//         symbolsOnlyRegex.test(lines[index + 1][endOfNumber + 1]);
//       const hasSymbolDiagonalAboveStartOfNumber =
//         index > 0 &&
//         symbolsOnlyRegex.test(lines[index - 1][startOfNumber - 1]);
//       const hasSymbolDiagonalBelowStartOfNumber =
//         index < lines.length - 1 &&
//         symbolsOnlyRegex.test(lines[index + 1][startOfNumber - 1]);

//       const hasSymbolAdjacentToNumber =
//         hasSymbolAfterEndOfNumber ||
//         hasSymbolBeforeStartOfNumber ||
//         hasSymbolAboveStartOfNumber ||
//         hasSymbolBelowStartOfNumber ||
//         hasSymbolAboveEndOfNumber ||
//         hasSymbolBelowEndOfNumber ||
//         hasSymbolDiagonalAboveEndOfNumber ||
//         hasSymbolDiagonalBelowEndOfNumber ||
//         hasSymbolDiagonalAboveStartOfNumber ||
//         hasSymbolDiagonalBelowStartOfNumber;

//       return hasSymbolAdjacentToNumber;
//     });

//     return numbersAdjacentToSymbols;
//   }
// });

// const onlyAvailable = onlyNumbersNextToSymbols
//   .filter((line) => line)
//   .flat()
//   .map((number) => parseInt(number!.number));

// console.log(onlyAvailable.join("\n"));
