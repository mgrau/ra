export default function StartingSuns(numPlayers: number) {
  switch (numPlayers) {
    case 2:
      return [[9, 6, 5, 2], [8, 7, 4, 3]];
    case 3:
      return [[13, 8, 5, 2], [12, 9, 6, 3], [11, 10, 7, 4]];
    case 4:
      return [[13, 6, 2], [12, 7, 3], [11, 8, 4], [10, 9, 5]];
    case 5:
      return [[16, 7, 2], [15, 8, 3], [14, 9, 4], [13, 10, 5], [12, 11, 6]];
  }
}
