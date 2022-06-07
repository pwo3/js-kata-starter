type Drink = "tea" | "coffee" | "orange juice" | "chocolate";

export type Money = {
  value: number;
  currency: "EUR";
};

type DrinksNumber = Record<Drink, number>;

export type StatisticsReport = {
  drinksNumber: DrinksNumber;
  totalEarned: Money;
};

const addDrinkToStatistics =
  (drinksNumber: DrinksNumber) =>
  (drink: Drink): DrinksNumber => {
    return {
      ...drinksNumber,
      [drink]: drinksNumber[drink] + 1,
    };
  };

const addDrinkToTotalEarned =
  (totalEarned: Money) =>
  (drink: Drink): Money => {
    const prices: Record<Drink, Money> = {
      tea: { value: 0.4, currency: "EUR" },
      coffee: { value: 0.6, currency: "EUR" },
      chocolate: { value: 0.5, currency: "EUR" },
      "orange juice": { value: 0.6, currency: "EUR" },
    };

    return {
      value: totalEarned.value + prices[drink].value,
      currency: "EUR",
    };
  };

export const Statistics = () => {
  let statistics: StatisticsReport = {
    drinksNumber: {
      "orange juice": 0,
      chocolate: 0,
      coffee: 0,
      tea: 0,
    },
    totalEarned: {
      currency: "EUR",
      value: 0,
    },
  };

  const getStatistics = () => statistics;

  const addDrink = (drink: Drink) => {
    statistics = {
      drinksNumber: addDrinkToStatistics(statistics.drinksNumber)(drink),
      totalEarned: addDrinkToTotalEarned(statistics.totalEarned)(drink),
    };
  };

  return {
    getStatistics,
    addDrink,
  };
};
