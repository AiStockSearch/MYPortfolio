export function splitLeadingHeroBlocks(blocks: { type?: string }[]) {
  const heroes: { type?: string }[] = [];
  let i = 0;
  while (i < blocks.length && blocks[i]?.type === "heroImage") {
    heroes.push(blocks[i++]);
  }
  return { heroBlocks: heroes, mainBlocks: blocks.slice(i) };
}
