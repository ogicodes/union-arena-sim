export const helloWorld = async (): Promise<string> => {
  try {
    return "Hello World!";
  } catch (e) {
    throw e;
  }
};
