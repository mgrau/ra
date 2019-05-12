import StartingSuns from "./suns";

test("distribution of tiles", () => {
  let suns: number[][];

  suns = StartingSuns(2);
  expect(suns.length).toBe(2);

  suns = StartingSuns(3);
  expect(suns.length).toBe(3);

  suns = StartingSuns(4);
  expect(suns.length).toBe(4);

  suns = StartingSuns(5);
  expect(suns.length).toBe(5);
});
