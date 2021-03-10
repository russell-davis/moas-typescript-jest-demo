import _ from "lodash";

export function isEmptyOrSpaces(text: string) {
    return text == null || text == undefined || text.match(/^\s*$/) !== null;
}

/**
 * @description Takes a number and returns a localized number string
 *
 * @constructor
 * @param {number} number
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#using_options
 */
export function toNumberString(number: number, locale?: string) {
    const localizedString = number.toLocaleString(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    return localizedString;
}

/**
 * @description Takes a number and an optional currency code and returns a localized currency string
 *
 * @constructor
 * @param amount
 * @param {string?} currencyCode
 * @param localeCode
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#using_options
 * @summary Uses LocaleCurrency library to get the currency code
 */
export function toMoneyString(amount: number, currencyCode: string, localeCode?: string) {
    const locale = (localeCode !== undefined) ? localeCode : navigator.language;
    const localizedString = amount.toLocaleString(locale, { style: 'currency', currency: currencyCode });
    return localizedString;
}

/**usage example:
 * var a = ['a', 1, 'a', 2, '1'];
 * var unique = a.filter(Utility.onlyUnique);
 * //returns ['a', 1, 2, '1']     
 */
export function onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
}

/**
* Converts 0.05000 to 5.000
*/
export function toPercentage(rate: number) {
    return _.round(Number(rate) * 100, 3);
}

/**
* Converts 5.000 to 0.05000
*/
export function toRate(percentage: number) {
    return _.round(Number(percentage) / 100, 5);
}

export const regexAllowOnlyNumbersAndUpToOneDecimal = () => /^\d*\.?\d*$/;
export const regexAllowOnlyThreeNumbersBeforeAndAfterUpToOneDecimal = () => /^\d{0,3}(\.\d{0,3})?$/;

export function validCommissionRate(commissionRate: number) {
    return commissionRate > 0 &&
        commissionRate <= 100 &&
        regexAllowOnlyThreeNumbersBeforeAndAfterUpToOneDecimal().test(commissionRate.toString());
}

export function trimWithEllipses(value: string, maxLengthBeforeTrimming: number) {
    return value.length > maxLengthBeforeTrimming ? value.substr(0, maxLengthBeforeTrimming - 1) + "…" : value;
}