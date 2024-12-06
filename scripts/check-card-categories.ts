import fs from "fs/promises";
import { join } from "path";
import type { Card } from "../packages/scrapper/src/types/";

/**
 * This CLI tools checks a directory of cards,
 * and logs the unique 'categoryData' field in the 'card.json'
 * file.
 *
 * Only unique 'categoryData' strings will be logged and outputted as an
 * array of string.
 *
 * USAGE:
 * ```bash
 * $ npx tsx check-card-categories.ts --dir='<path-to-cards-dir>'
 * ```
 * */

const args = process.argv.slice(2);

const findArg = (key: string): string | undefined => {
  const arg = args.find((arg) => arg.startsWith(`${key}=`));
  return arg ? arg.split("=")[1] : undefined;
};

const getDirectories = async (path: string): Promise<string[]> => {
  const entries = await fs.readdir(path, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(path, entry.name));
};

const findFile = async (
  dir: string,
  target: string,
): Promise<string | null> => {
  const files = await fs.readdir(dir);
  for (const file of files) {
    if (file === target) {
      return join(dir, file);
    }
  }
  return null;
};

const parseFile = async (path: string): Promise<Card> => {
  const content = await fs.readFile(path, "utf8");
  return JSON.parse(content) as Card;
};

const dir = findArg("--dir");

if (!dir) throw new Error("no directory specified.");

const main = async () => {
  const dirs = await getDirectories(dir);
  const CARD_FILE_NAME = "card.json";
  const categories: string[] = [];
  for (let i = 0; i < dirs.length; i++) {
    const file = await findFile(dirs[i], CARD_FILE_NAME);
    if (!file)
      throw new Error(
        `file with name: ${CARD_FILE_NAME} not located in: ${dirs[i]}`,
      );
    const { categoryData } = await parseFile(file);
    categories.push(categoryData);
  }
  const uniqueCategories = [...new Set(categories)];
  console.log(uniqueCategories);
};

main();
