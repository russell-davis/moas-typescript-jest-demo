import theoretically from 'jest-theories';
import {toMoneyString, toNumberString} from "../src/Utilities";
require("intl");

const countDecimals = function (value: number) {
    if(Math.floor(value.valueOf()) === value.valueOf()) return 0;
    return value.toString().split(".")[1].length || 0;
}

describe("Utilities Tests", () => {
    describe("toMoneyString", () => {
        describe('when culture is "en-US"', () => {
            const currencyCode = "en-US";
            const amount = 1234567.89;

            const theories = [
                { input: {amount, currency: "USD"}, expected: "$1,234,567.89" },
                { input: {amount, currency: "EUR"}, expected: "€1,234,567.89" },
                { input: {amount, currency: "SGD"}, expected: "SGD 1,234,567.89" },
                { input: {amount, currency: "AUD"}, expected: "A$1,234,567.89" },
                { input: {amount, currency: "GBP"}, expected: "£1,234,567.89" },
            ];

            theoretically(`toMoneyString({input.amount}, {input.currency}, '${currencyCode}') should return "{expected}"`, theories, theory => {
                const output = toMoneyString(theory.input.amount, theory.input.currency, currencyCode);
                expect(output).toBe(theory.expected);
            });
        })
        describe('when culture is "en-AU"', () => {
            const currencyCode = "en-AU";
            const amount = 1234567.89;

            const theories = [
                { input: {amount, currency: "USD"}, expected: "USD 1,234,567.89" },
                { input: {amount, currency: "EUR"}, expected: "EUR 1,234,567.89" },
                { input: {amount, currency: "SGD"}, expected: "SGD 1,234,567.89" },
                { input: {amount, currency: "AUD"}, expected: "$1,234,567.89" },
                { input: {amount, currency: "GBP"}, expected: "GBP 1,234,567.89" },
            ];

            theoretically(`toMoneyString({input.amount}, {input.currency}, '${currencyCode}') should return "{expected}"`, theories, theory => {
                const output = toMoneyString(theory.input.amount, theory.input.currency, currencyCode);
                expect(output).toBe(theory.expected);
            });
        })
        describe('when culture is "en-SG"', () => {
            const currencyCode = "en-SG";
            const amount = 1234567.89;

            const theories = [
                { input: {amount, currency: "USD"}, expected: "US$1,234,567.89" },
                { input: {amount, currency: "EUR"}, expected: "€1,234,567.89" },
                { input: {amount, currency: "SGD"}, expected: "$1,234,567.89" },
                { input: {amount, currency: "AUD"}, expected: "A$1,234,567.89" },
                { input: {amount, currency: "GBP"}, expected: "£1,234,567.89" },
            ];

            theoretically(`toMoneyString({input.amount}, {input.currency}, '${currencyCode}') should return "{expected}"`, theories, theory => {
                const output = toMoneyString(theory.input.amount, theory.input.currency, currencyCode);
                expect(output).toBe(theory.expected);
            });
        })
        describe('when culture is "de-DE"', () => {
            const currencyCode = "de-DE";
            const amount = 1234567.89;

            const theories = [
                { input: {amount, currency: "USD"}, expected: "1.234.567,89 $" },
                { input: {amount, currency: "EUR"}, expected: "1.234.567,89 €" },
                { input: {amount, currency: "SGD"}, expected: "1.234.567,89 SGD" },
                { input: {amount, currency: "AUD"}, expected: "1.234.567,89 AU$" },
                { input: {amount, currency: "GBP"}, expected: "1.234.567,89 £" },
            ];

            theoretically(`toMoneyString({input.amount}, {input.currency}, '${currencyCode}') should return "{expected}"`, theories, theory => {
                const output = toMoneyString(theory.input.amount, theory.input.currency, currencyCode);
                expect(output).toBe(theory.expected);
            });
        })
        describe('when culture is "en-IE"', () => {
            const currencyCode = "en-IE";
            const amount = 1234567.89;

            const theories = [
                { input: {amount, currency: "USD"}, expected: "US$1,234,567.89" },
                { input: {amount, currency: "EUR"}, expected: "€1,234,567.89" },
                { input: {amount, currency: "SGD"}, expected: "SGD 1,234,567.89" },
                { input: {amount, currency: "AUD"}, expected: "A$1,234,567.89" },
                { input: {amount, currency: "GBP"}, expected: "£1,234,567.89" },
            ];

            theoretically(`toMoneyString({input.amount}, {input.currency}, '${currencyCode}') should return "{expected}"`, theories, theory => {
                const output = toMoneyString(theory.input.amount, theory.input.currency, currencyCode);
                expect(output).toBe(theory.expected);
            });
        })
        describe('when culture is "en-GB"', () => {
            const currencyCode = "en-GB";
            const amount = 1234567.89;

            const theories = [
                { input: {amount, currency: "USD"}, expected: "US$1,234,567.89" },
                { input: {amount, currency: "EUR"}, expected: "€1,234,567.89" },
                { input: {amount, currency: "SGD"}, expected: "SGD 1,234,567.89" },
                { input: {amount, currency: "AUD"}, expected: "A$1,234,567.89" },
                { input: {amount, currency: "GBP"}, expected: "£1,234,567.89" },
            ];

            theoretically(`toMoneyString({input.amount}, {input.currency}, '${currencyCode}') should return "{expected}"`, theories, theory => {
                const output = toMoneyString(theory.input.amount, theory.input.currency, currencyCode);
                expect(output).toBe(theory.expected);
            });
        })
    })
    describe("toNumberString", () => {
        it('should be defined', function () {
            expect(toNumberString).toBeDefined();
        });

        it('should return a number with two decimal places as a string', function () {
            const value = toNumberString(1234567.89);
            expect(value).toBeDefined();
            expect(value).toBe("1,234,567.89")
        });

        describe('when used in countries that use the period for decimals', () => {
            const theories = [
                { input: 1000, expected: "1,000.00" },
                { input: 18104.63, expected: "18,104.63" },
                { input: -123456789, expected: "-123,456,789.00" },
            ];

            describe('when locale set to "en-US"', () => {
                theoretically(`toNumberString({input}) should return "{expected}"`, theories, theory => {
                    const output = toNumberString(theory.input, 'en-US');
                    expect(output).toBe(theory.expected);
                });
            });
            describe('when locale set to "en-AU"', () => {
                theoretically(`toNumberString({input}) should return "{expected}"`, theories, theory => {
                    const output = toNumberString(theory.input, 'en-AU');
                    expect(output).toBe(theory.expected);
                });
            });
            describe('when locale set to "en-SG"', () => {
                theoretically(`toNumberString({input}) should return "{expected}"`, theories, theory => {
                    const output = toNumberString(theory.input, 'en-SG');
                    expect(output).toBe(theory.expected);
                });
            });
            describe('when locale set to "en-IE"', () => {
                theoretically(`toNumberString({input}) should return "{expected}"`, theories, theory => {
                    const output = toNumberString(theory.input, 'en-IE');
                    expect(output).toBe(theory.expected);
                });
            });
            describe('when locale set to "en-GB"', () => {
                theoretically(`toNumberString({input}) should return "{expected}"`, theories, theory => {
                    const output = toNumberString(theory.input, 'en-GB');
                    expect(output).toBe(theory.expected);
                });
            });
        });
        describe('when used in countries that use the comma for decimals', () => {
            describe('when locale set to "en-DE"', () => {
                const theories = [
                    { input: 1000, expected: "1.000,00" },
                    { input: 18104.63, expected: "18.104,63" },
                    { input: -1234567.89, expected: "-1.234.567,89" },
                ];

                theoretically(`toNumberString({input}) should return "{expected}"`, theories, theory => {
                    const output = toNumberString(theory.input, 'en-DE');
                    expect(output).toBe(theory.expected);
                });
            });
        });
    })
    describe("toPercentString", () => {

    });
});