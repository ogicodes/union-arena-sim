import { JSDOM } from "jsdom";
import { ParserResult } from "../types";

/**
 * Takes data in the shape of a dom representation
 * (useful for the effectData, triggerData, etc) and
 * parses out the image src url, alt text and text nodes from it,
 * returns an object
 * */
export const domParser = (data: string): ParserResult => {
  const result: ParserResult = { images: [], text: [], parserResultOrder: [] };

  const dom = new JSDOM(data);
  const document = dom.window.document;

  let currentNode: ChildNode | null = document.body.firstChild;

  while (currentNode) {
    if (currentNode.nodeType === dom.window.Node.TEXT_NODE) {
      const textContent = currentNode.textContent?.trim();
      if (textContent) {
        result.text.push(textContent);
        result.parserResultOrder.push("text_node");
      }
    } else if (currentNode.nodeType === dom.window.Node.ELEMENT_NODE) {
      const element = currentNode as Element;
      if (element.tagName === "IMG") {
        result.images.push({
          src: element.getAttribute("src") || "",
          alt: element.getAttribute("alt") || "",
        });
        result.parserResultOrder.push("img");
      }
    }
    currentNode = currentNode.nextSibling;
  }

  return result;
};

/**
 * Takes an array of agnostic strings:
 * ["Foo is Bar", "Bar is Foo"]
 *
 * Converts it into a single string:
 * "foo-is-bar%bar-is-foo"
 *
 * This is useful when passing in an array of
 * multiple effectData or triggerData, and converts it
 * into a friendly standard format.
 * */
export const dashProp = (data: string[]): string => {
  return data.map((word) => word.toLowerCase().replace(/\s+/g, "-")).join("%");
};
