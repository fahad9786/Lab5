import { handleInput, clearInput } from '../Order.js';

describe("Tests all stages of an order", function () {
    beforeEach(function () {
        clearInput();
    });
    it("test hello", function () {
        const aResults = handleInput("hello");
        expect(aResults[0]).toBe("Welcome to Rich's Acton Rapid Test.");
    });
    it("test yes", function () {
        handleInput("hello");
        const aResults = handleInput("yes");
        expect(aResults[0]).toBe("Your rapid test is reserved");
    });
    it("test no", function () {
        handleInput("hello");
        const aResults = handleInput("no");
        expect(aResults[0]).toBe("Thanks for trying our reservation system");
    });
});

