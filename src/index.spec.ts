// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { CoffeeMachineInput, coffeeMachine, CoffeeMachineOutput, Money, ErrorMessage } from ".";
expect.extend(matchers);

it("should return tea", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 0,
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 0, stick: "without stick" };

  expect(actual).toEqual(output);
});

it("should return chocolate", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "chocolate",
    numberOfSugar: 0,
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "chocolate", numberOfSugar: 0, stick: "without stick" };

  expect(actual).toEqual(output);
});

it("should return coffee", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "coffee",
    numberOfSugar: 0,
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "coffee", numberOfSugar: 0, stick: "without stick" };

  expect(actual).toEqual(output);
});

it("should return tea with 1 sugar", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 1, stick: "with stick" };

  expect(actual).toEqual(output);
});

it("should return tea with 2 sugars", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 2,
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 2, stick: "with stick" };

  expect(actual).toEqual(output);
});

it("should return one stick if there is at least one sugar", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 1,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 1, stick: "with stick" };

  expect(actual).toEqual(output);
});

it("should not return tea if not enough money given", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 0.1,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough money: 0.3 EUR missing";

  expect(actual).toEqual(output);
});

it("should return 0.2 EUR missing for a tea", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 0.2,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough money: 0.2 EUR missing";

  expect(actual).toEqual(output);
});

it("should return a tea for 0.4 EUR", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "tea",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 0.4,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: CoffeeMachineOutput = { drink: "tea", numberOfSugar: 1, stick: "with stick" };

  expect(actual).toEqual(output);
});

it("should return a coffee for 0.6 EUR", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "coffee",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 0.1,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough money: 0.5 EUR missing";

  expect(actual).toEqual(output);
});

it("should not return coffee for 0.5 EUR", function () {
  // GIVEN
  const input: CoffeeMachineInput = {
    drink: "coffee",
    numberOfSugar: 1,
  };

  const moneyInput: Money = {
    value: 0.5,
    currency: "EUR",
  };

  // WHEN
  const actual = coffeeMachine(input)(moneyInput);

  // THEN
  const output: ErrorMessage = "Not enough money: 0.1 EUR missing";

  expect(actual).toEqual(output);
});
