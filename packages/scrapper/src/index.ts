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
      {
        type: "input",
        name: "resumeIndex",
        message: "Resume from idx? (enter to restart): ",
        default: "",
      },
    ]);

    // Useful if script starts hanging
    const resumeIndex = answers.resumeIndex ? Number(answers.resumeIndex) : 0;

    /**
     * Set the directory to save the data to
     * */
    await createDir(answers.path);

    const data = await scrape(answers.url);

    /**
     * Perform a loop to save each card into a dir
     * */
    let saved = 0;
    for (let i = resumeIndex; i < data.length; i++) {
      const card = data[i];
      const savedCard = await saveCard(card, answers.path);
      saved++;
      console.info(`${i} - saved: ${savedCard}`);
    }

    console.info(
      `${saved}/${data.length} @ ${((saved / data.length) * 100).toFixed(2)}%`,
    );
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
      rarity: card.rarity ? card.rarity.toLowerCase() : null,
      name: card.name.toLowerCase(),
      seriesName: card.seriesName.toLowerCase(),
      series: card.series.toLowerCase(),
      needEnergyData: card.needEnergyData ? Number(card.needEnergyData) : null,
      color: card.color ? card.color.toLowerCase() : null,
      apData: Number(card.apData),
      categoryData: card.categoryData.toLowerCase(),
      bpData: card.bpData ? Number(card.bpData) : null,
      attributeData: card.attributeData ? card.attributeData : null,
      generatedEnergyData: card.generatedEnergyData
        ? Number(card.generatedEnergyData)
        : null,
      effectData: card.effectData ? dashProp(parsedEffectData.text) : null,
      triggerData: card.triggerData ? dashProp(parsedTriggerData.text) : null,
      getInfoData: card.getInfoData ? card.getInfoData : null,
    };

    const filePath = join(constructedDir, CARD_FILE_NAME);
    await writeFile(formattedCardData, filePath);

    return formattedCardData.name;
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
