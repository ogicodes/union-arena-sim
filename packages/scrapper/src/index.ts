import inquirer from "inquirer";
import { exit } from "process";
import type { FormattedCard, Card } from "./types";
import { join } from "path";
import { createDir, writeFile, writeImage } from "./utils/fs";
import { dashProp, domParser } from "./utils/parsers";

const main = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "path",
        message: "Enter Directory to save to: ",
      },
      {
        type: "input",
        name: "url",
        message: "Enter URL: ",
      },
    ]);

    /**
     * Set the directory to save the data to
     * */
    await createDir(answers.path);

    const data = await scrape(answers.url);

    /**
     * Perform a loop to save each card into a dir
     * */
    for (let i = 0; i < data.length; i++) {
      const card = data[i];
      const savedCard = await saveCard(card, answers.path);
      console.log(`saved: ${savedCard}`);
    }
  } catch (e) {
    console.error("An error occurred:", e);
    exit(1);
  }
};

/**
 * Handles the saving of a card, returns the cardDir
 * when completed successfully
 * */
const saveCard = async (card: Card, dir: string): Promise<string> => {
  try {
    /**
     * Creates a directory: /foo/bar/
     * Where foo is the inquierer dir,
     * bar is the name of the card
     * */
    const CARD_FILE_NAME: string = "card.json";
    const cardDir = card.name.split(" ").join("-").toLowerCase();

    // Create the dir for the card
    const constructedDir = join(dir, cardDir);
    await createDir(constructedDir);

    // Create the dir for the card assets
    const assetsDir = join(constructedDir, "assets");
    await createDir(assetsDir);

    /**
     * Handle the images
     * */
    const imagePath = join(constructedDir, `card-image.webp`);
    await writeImage(card.image, imagePath);

    const parsedEffectData = domParser(card.effectData);
    if (card.effectData) {
      for (let i = 0; i < parsedEffectData.images.length; i++) {
        const effectDataImage = parsedEffectData.images[i].src;
        const constructedImageName = `effect-${i}.webp`;
        const constructedImagePath = `${assetsDir}/${constructedImageName}`;
        await writeImage(effectDataImage, constructedImagePath);
      }
    }

    const parsedTriggerData = domParser(card.triggerData);
    if (card.triggerData) {
      for (let i = 0; i < parsedTriggerData.images.length; i++) {
        const triggerDataImage = parsedTriggerData.images[i].src;
        const constructedImageName = `trigger-${i}.webp`;
        const constructedImagePath = `${assetsDir}/${constructedImageName}`;
        await writeImage(triggerDataImage, constructedImagePath);
      }
    }

    /**
     * Saves the card data to the directory:
     * /foo/bar/card.json
     * */
    const formattedCardData: FormattedCard = {
      cardNo: card.cardNo,
      rarity: card.rarity.toLowerCase(),
      name: card.name.toLowerCase(),
      seriesName: card.seriesName.toLowerCase(),
      series: card.series.toLowerCase(),
      needEnergyData: card.needEnergyData,
      color: card.color.toLowerCase(),
      apData: card.apData,
      categoryData: card.categoryData.toLowerCase(),
      bpData: card.bpData,
      attributeData: card.attributeData,
      generatedEnergyData: card.generatedEnergyData,
      effectData: dashProp(parsedEffectData.text),
      triggerData: dashProp(parsedTriggerData.text),
      getInfoData: card.getInfoData,
      format: card.format.toLowerCase(),
    };

    const filePath = join(constructedDir, CARD_FILE_NAME);
    await writeFile(formattedCardData, filePath);

    return cardDir;
  } catch (e) {
    throw new Error(`Unable to save card ${card.name}: ${e}`);
  }
};

const scrape = async (url: string): Promise<Card[]> => {
  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Unable to fetch data: ${response.statusText}`);
    }

    return (await response.json()) as Card[];
  } catch (e) {
    throw new Error(`Unable to scrape data from URL ${url}: ${e}`);
  }
};

main();
