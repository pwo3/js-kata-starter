import { Statistics, StatisticsReport } from ".";

describe("statistics", () => {
  it("should add a coffee to statistics", () => {
    // GIVEN
    const statistics = Statistics();

    // WHEN
    statistics.addDrink("coffee");

    // THEN
    const expected: StatisticsReport = {
      drinksNumber: {
        "orange juice": 0,
        chocolate: 0,
        coffee: 1,
        tea: 0,
      },
      totalEarned: {
        value: 0.6,
        currency: "EUR",
      },
    };

    expect(statistics.getStatistics()).toEqual(expected);
  });

  it("should add two coffees to statistics", () => {
    // GIVEN
    const statistics = Statistics();

    // WHEN
    statistics.addDrink("coffee");
    statistics.addDrink("coffee");

    // THEN
    const expected: StatisticsReport = {
      drinksNumber: {
        "orange juice": 0,
        chocolate: 0,
        coffee: 2,
        tea: 0,
      },
      totalEarned: {
        value: 1.2,
        currency: "EUR",
      },
    };

    expect(statistics.getStatistics()).toEqual(expected);
  });

  it("should add two coffees and 1 tea to statistics", () => {
    // GIVEN
    const statistics = Statistics();

    // WHEN
    statistics.addDrink("coffee");
    statistics.addDrink("coffee");
    statistics.addDrink("tea");

    // THEN
    const expected: StatisticsReport = {
      drinksNumber: {
        "orange juice": 0,
        chocolate: 0,
        coffee: 2,
        tea: 1,
      },
      totalEarned: {
        value: 1.6,
        currency: "EUR",
      },
    };

    expect(statistics.getStatistics()).toEqual(expected);
  });
});
