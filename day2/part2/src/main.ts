async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const games = lines.map((line) => {
    let minNeededForGame: { [key: string]: number } = {
      red: 0,
      blue: 0,
      green: 0,
    };

    const game = line.split(":");
    const containers = game[1].split(";");
    const rolls = containers.map((container) => container.split(","));

    rolls.forEach((roll) => {
      return roll.map((cube) => {
        const [amount, color] = cube.trim().split(" ");

        if (minNeededForGame[color] < Number(amount)) {
          minNeededForGame[color] = Number(amount);
        }
      });
    });

    const multiplyNumbersPerGame = Object.values(minNeededForGame).reduce(
      (acc, num) => acc * num,
      1
    );

    return multiplyNumbersPerGame;
  });

  let result = games.reduce((acc, num) => acc + num, 0);

  console.log(result);
}

main();
