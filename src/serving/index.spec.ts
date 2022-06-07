// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { CoffeeMachineInput, coffeeMachine, CoffeeMachineOutput, Money, ErrorMessage, Dependencies } from ".";
expect.extend(matchers);

it("should return tea", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 0,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 0, stick: "without stick", heat: "hot" };

  expect(actual).toEqual(output);
});

it("should return chocolate", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "chocolate",
    numberOfSugar: 0,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "chocolate", numberOfSugar: 0, stick: "without stick", heat: "hot" };

  expect(actual).toEqual(output);
});

it("should return coffee", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "coffee",
    heat: "hot",
    numberOfSugar: 0,
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "coffee", numberOfSugar: 0, stick: "without stick", heat: "hot" };

  expect(actual).toEqual(output);
});

it("should return tea with 1 sugar", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN,
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 1, stick: "with stick", heat: "hot" };

  expect(actual).toEqual(output);
});

it("should return tea with 2 sugars", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 2,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 2, stick: "with stick", heat: "hot" };

  expect(actual).toEqual(output);
});

it("should return one stick if there is at least one sugar", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 1, stick: "with stick", heat: "hot" };

  expect(actual).toEqual(output);
});

it("should not return tea if not enough money given", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    heat: "hot",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 0.1,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough money: 0.3 EUR missing";

  expect(actual).toEqual(output);
});

it("should return 0.2 EUR missing for a tea", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 0.2,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough money: 0.2 EUR missing";

  expect(actual).toEqual(output);
});

it("should return a tea for 0.4 EUR", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 0.4,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 1, stick: "with stick", heat: "hot" };

  expect(actual).toEqual(output);
});

it("should return a coffee for 0.6 EUR", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "coffee",
    numberOfSugar: 1,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 0.1,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough money: 0.5 EUR missing";

  expect(actual).toEqual(output);
});

it("should not return coffee for 0.5 EUR", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "coffee",
    numberOfSugar: 1,
    heat: "hot",
  };

  const moneyInput: Money = {
    value: 0.5,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough money: 0.1 EUR missing";

  expect(actual).toEqual(output);
});

it("should return an orange juice for 0.6 EUR", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "orange juice",
    numberOfSugar: 0,
    heat: "cold",
  };

  const moneyInput: Money = {
    value: 0.6,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "orange juice", numberOfSugar: 0, stick: "without stick", heat: "cold" };

  expect(actual).toEqual(output);
});

it("should return a coffee extra hot", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "coffee",
    heat: "extra hot",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 0.6,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(true),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "coffee", numberOfSugar: 1, stick: "with stick", heat: "extra hot" };

  expect(actual).toEqual(output);
});

it("should not return coffee if there is no beverage", async function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "coffee",
    heat: "hot",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 0.6,
    currency: "EUR",
  };

  const dependencies: Dependencies = {
    isThereEnoughBeverageAvailable: jest.fn().mockResolvedValueOnce(false),
    notifyMissingDrink: jest.fn(),
  };

  // WHEN
  const actual = await coffeeMachine(dependencies)(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough beverage available for this drink.";

  expect(actual).toEqual(output);
});
