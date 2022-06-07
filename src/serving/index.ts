import { roundValue } from "../utils";

export type ColdDrink = "orange juice";
export type HotDrink = "coffee" | "tea" | "chocolate";
export type Drink = ColdDrink | HotDrink;
export type NumberOfSugar = 0 | 1 | 2;
export type Stick = "with stick" | "without stick";

export type Money = {
  value: number;
  currency: "EUR";
};

export type CoffeeMachineHotInput = {
  drink: HotDrink;
  heat: "hot" | "extra hot";
  numberOfSugar: NumberOfSugar;
};

export type CoffeeMachineColdInput = {
  drink: ColdDrink;
  heat: "cold";
  numberOfSugar: NumberOfSugar;
};

export type CoffeeMachineInput = CoffeeMachineHotInput | CoffeeMachineColdInput;

export type CoffeeMachineOutput = CoffeeMachineInput & {
  stick: Stick;
};

export type Dependencies = {
  notifyMissingDrink: () => Promise<void>;
  isThereEnoughBeverageAvailable: () => Promise<boolean>;
};

export type ErrorMessage = string;

const prices: Record<Drink, Money> = {
  tea: { value: 0.4, currency: "EUR" },
  coffee: { value: 0.6, currency: "EUR" },
  chocolate: { value: 0.5, currency: "EUR" },
  "orange juice": { value: 0.6, currency: "EUR" },
};

const completeTheOrder = (input: CoffeeMachineInput): CoffeeMachineOutput => {
  const stick: Stick = input.numberOfSugar > 0 ? "with stick" : "without stick";

  return {
    ...input,
    stick,
  };
};

const computeMissingMoney = ({ amount, price }: { price: Money; amount: Money }): Money => {
  const missingAmount = roundValue(price.value - amount.value);

  return {
    value: missingAmount,
    currency: "EUR",
  };
};

const buildErrorMessageForMissingMoney = ({ amount, price }: { price: Money; amount: Money }): ErrorMessage => {
  const missingAmount = computeMissingMoney({ amount, price });

  return `Not enough money: ${missingAmount.value} ${missingAmount.currency} missing`;
};

export const coffeeMachine =
  ({ isThereEnoughBeverageAvailable }: Dependencies) =>
  (input: CoffeeMachineInput) =>
  async (amount: Money): Promise<CoffeeMachineOutput | ErrorMessage> => {
    const price = prices[input.drink];

    if (amount.value < price.value) {
      return buildErrorMessageForMissingMoney({ amount, price });
    }

    const hasEnoughBeverage = await isThereEnoughBeverageAvailable();

    if (!hasEnoughBeverage) {
      return "Not enough beverage available for this drink.";
    }

    return completeTheOrder(input);
  };
