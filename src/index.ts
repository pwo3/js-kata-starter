import { roundValue } from "./utils";

export type Drink = "coffee" | "tea" | "chocolate";
export type NumberOfSugar = 0 | 1 | 2;
export type Stick = "with stick" | "without stick";

export type Money = {
  value: number;
  currency: "EUR";
};

export type CoffeeMachineInput = {
  drink: Drink;
  numberOfSugar: NumberOfSugar;
};

export type CoffeeMachineOutput = CoffeeMachineInput & {
  stick: Stick;
};

export type ErrorMessage = string;

const prices: Record<Drink, Money> = {
  tea: { value: 0.4, currency: "EUR" },
  coffee: { value: 0.6, currency: "EUR" },
  chocolate: { value: 0.5, currency: "EUR" },
};

const completeTheOrder = ({ drink, numberOfSugar }: CoffeeMachineInput): CoffeeMachineOutput => {
  const stick: Stick = numberOfSugar > 0 ? "with stick" : "without stick";

  return {
    drink,
    numberOfSugar,
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
  ({ drink, numberOfSugar }: CoffeeMachineInput) =>
  (amount: Money): CoffeeMachineOutput | ErrorMessage => {
    const price = prices[drink];

    if (amount.value < price.value) {
      return buildErrorMessageForMissingMoney({ amount, price });
    }

    return completeTheOrder({
      drink,
      numberOfSugar,
    });
  };
