/**
 * this function parses the effect data and returns a string of the effects
 * @param data - the effect data
 * @returns string - the effects
 */
export const parseEffects = (data: string): string => {
  const words = data.split("%").map((sentence) => sentence.replace("-", " "));
  return words.join(" ");
};

/**
 * this function checks if the effect data contains "raid"
 * @param data - the effect data
 * @returns boolean - true if the effect data contains "raid", false otherwise
 */
export const containsRaid = (data: string): boolean => {
  return data.includes("raid");
};

/**
 * this function gets the raid target from the effect data
 * @param data - the effect data
 * @returns string - the raid target
 */
export const getRaidTarget = (data: string): string => {
  const target = data.match(/<([^>]+)>/)?.[1] || "";
  return target.replace("-", " ");
};
