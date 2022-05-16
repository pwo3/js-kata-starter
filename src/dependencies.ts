import { CoffeeMachineOutput, Drink, NumberOfSugar, Stick } from ".";

type DrinkOuput = "H" | "T" | "C";

const drinkMapping: Record<Drink, DrinkOuput> = {
  chocolate: "H",
  coffee: "C",
  tea: "T",
};

const numberOfSugarMapping: Record<NumberOfSugar, string> = {
  0: "",
  1: "1",
  2: "2",
};

const stickMapping: Record<Stick, string> = {
  "with stick": "0",
  "without stick": "",
};

export const printCoffeeMachineOutput = ({ drink, numberOfSugar, stick }: CoffeeMachineOutput) => {
  const drinkOutput = drinkMapping[drink];
  const numberOfSugarOutput = numberOfSugarMapping[numberOfSugar];
  const stickOutput = stickMapping[stick];

  // TODO: handle "M:message-content"

  return `${drinkOutput}:${numberOfSugarOutput}:${stickOutput}`;
};
