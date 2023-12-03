async function main() {
  const file = Bun.file("src/data.txt");
  if (!file.size) return console.log("no data to process");

  const lines = (await file.text()).split("\n");

  const bag: { [key: string]: number } = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const gamesThatCanBePlayed = lines.filter((line) => {
    const game = line.split(":");
    const containers = game[1].split(";");

    const rounds = containers.map((container) => container.split(","));

    const roundIsPlayable = rounds.every((round) => {
      const cubes = round.map((cube) => {
        const [amount, color] = cube.trim().split(" ");
        return { color, amount: Number(amount) };
      });
      const cubeHasAllColorsinBag = cubes.filter((cube) => {
        const { color, amount } = cube;
        return bag[color] >= amount;
      });

      const gameIsPlayable = cubeHasAllColorsinBag.length === cubes.length;

      return gameIsPlayable;
    });

    return roundIsPlayable;
  });

  const gameIds = gamesThatCanBePlayed.map((game) => {
    const idNumber = game.split(" ")[1].split(":")[0];
    return Number(idNumber);
  });

  const sumAllGameIds = gameIds.reduce((acc, id) => acc + id, 0);

  let result = sumAllGameIds;

  console.log(result);
}

main();
