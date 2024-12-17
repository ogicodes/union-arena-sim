import { describe, it, expect, test } from "@jest/globals";
import { parseActivationTimingAbilities } from "../../src/utils/parse-activation-timing-abilities";
import { ActivationTimingAbility } from "../../src/types";

interface TestCase {
  name: string;
  case: string;
  result: ActivationTimingAbility[];
}

const testCases: TestCase[] = [
  {
    name: "UE01BT/BLC-1-024",
    case: "raid%<yhwach>-switch-to-active.-may-move-to-the-front-line.%during-your-turn%if-two-or-more-characters-have-been-sidelined-this-turn|-this-character-gains-1000-bp-and%damage-(2)%.%when-played%choose-one-of-the-following:%・choose-up-to-one-raided-card-on-your-opponent's-front-line-and-place-its-top-raided-card-into-their-sideline.%・choose-up-to-one-character-with-3000-or-less-bp-on-your-opponent's-front-line-and-sideline-it.",
    result: ["When Played", "Raid", "During Your Turn"],
  },
  {
    name: "UE01BT/BLC-1-055-ALT1",
    case: "[activate:-main]%if-on-the-front-line%pay-1-ap%once-per-turn%choose-up-to-one-character-with-3500-or-less-bp-on-your-opponent's-front-line.-at-the-start-of-your-opponent's-next-turn|-sideline-that-character|-then-switch-this-character-to-resting-and-move-it-to-your-energy-line.",
    result: ["Activate: Main"],
  },
  {
    name: "UE01BT/BLC-1-006",
    case: "if-there-are-one-or-more-resting-characters-on-your-opponent's-field|-play-this-character-set-to-active-onto-your-field.%when-attacking%choose-up-to-one-resting-character-on-your-opponent's-field.-it-will-remain-set-to-resting-the-next-time-it-would-be-switched-to-active.",
    result: ["When Attacking"],
  },
  {
    name: "UE04BT/CGH-1-006",
    case: "nullify-impact%(the-character-battling-this-character-loses%impact%for-the-duration-of-this-battle.)%when-sidelined%draw-a-card.",
    result: ["When Sidelined"],
  },
  {
    name: "UE03BT/JJK-1-011",
    case: "double-block%(when-this-character-blocks-for-the-first-time-this-turn|-switch-it-to-active.)%during-opponent's-turn%your-opponent-cannot-choose-this-character-with-abilities-on-character-or-event-cards-unless-they-pay-1-ap-as-an-additional-cost.",
    result: [`During Opponent's Turn`],
  },
  {
    name: "UE03BT/JJK-1-006",
    case: "",
    result: [],
  },
  {
    name: "UE03BT/JJK-1-084",
    case: "double-attack%(when-this-character-attacks-for-the-first-time-this-turn|-switch-it-to-active.)%this-character-must-block-your-opponent's-attacks-if-able.%when-played%choose-up-to-one-character-on-your-opponent's-front-line.-it-loses-1000-bp-for-each-other-[kyoto-jujutsu-high]-affinity-card-on-the-same-line-as-this-character-until-the-end-of-the-turn.%when-blocking%choose-one-attacking-character-on-your-opponent's-field.-it-loses-1000-bp-for-each-other-[kyoto-jujutsu-high]-affinity-card-on-the-same-line-as-this-character-until-the-end-of-the-turn.",
    result: ["When Played", "When Blocking"],
  },
];
describe("parseActivationTimingAbilities", () => {
  for (let i = 0; i < testCases.length; i++) {
    it(`should let ${testCases[i].name} to be ${testCases[i].result}`, () => {
      const actual = parseActivationTimingAbilities(testCases[i].case);
      expect(actual).toEqual(testCases[i].result);
    });
  }
});
