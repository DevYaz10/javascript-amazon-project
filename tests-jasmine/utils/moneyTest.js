//# jasmine is a testing framework 

import { formatCurrency } from "../../scripts/utils/money.js";

//$ describe() makes a test suite 
describe("test suite: formatCurrency", () => {
    it("convert cents into dollars", () => {
        expect(formatCurrency(2095)).toEqual("20.95");
    });

    it("works with 0", () => {
        expect(formatCurrency(0)).toEqual("0.00");
    });

    it("works with decimal values", () => {
        expect(formatCurrency(2000.5)).toEqual("20.01");
    });

    it("rounds to 2 decimal places", () => {
        expect(formatCurrency(2000.4)).toEqual("20.00");
    });
});