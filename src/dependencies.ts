import { CoffeeMachineOutput, Drink, NumberOfSugar, Stick } from "./serving";

type DrinkOuput = "H" | "T" | "C" | "O";

const drinkMapping: Record<Drink, DrinkOuput> = {
  chocolate: "H",
  coffee: "C",
  tea: "T",
  "orange juice": "O",
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

export const isThereEnoughBeverageAvailable = (): boolean => {
  return;
};

export const notifyMissingDrink = () => {
  return;
};
