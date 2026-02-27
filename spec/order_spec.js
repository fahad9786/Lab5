import { handleInput, clearInput } from '../Order.js';

describe("Tests all stages of a Dar Medina order", function () {

    beforeEach(function () {
        clearInput();
    });

    it("test welcome", function () {
        const aResults = handleInput("hello");
        expect(aResults[0]).toBe("Welcome to Dar Medina Moroccan Kitchen!");
    });

    it("test choosing chicken tagine", function () {
        handleInput("hello");
        const aResults = handleInput("1");
        expect(aResults[0]).toContain("Chicken Tagine");
    });

    it("test choosing lamb couscous", function () {
        handleInput("hello");
        const aResults = handleInput("2");
        expect(aResults[0]).toContain("Lamb Couscous");
    });

    it("test full chicken tagine order no extra item no tea", function () {
        handleInput("hello");
        handleInput("1");          // chicken tagine
        handleInput("medium");     // size
        handleInput("spicy");      // spice
        handleInput("no");         // no another item
        const aResults = handleInput("no"); // no mint tea
        expect(aResults.some(s => s.includes("Medium Chicken Tagine"))).toBe(true);
        expect(aResults.some(s => s.includes("Shukran"))).toBe(true);
    });

    it("test full lamb couscous order with raisins and mint tea", function () {
        handleInput("hello");
        handleInput("2");          // lamb couscous
        handleInput("large");      // size
        handleInput("yes");        // raisins
        handleInput("no");         // no another item
        const aResults = handleInput("yes"); // add mint tea
        expect(aResults.some(s => s.includes("Large Lamb Couscous"))).toBe(true);
        expect(aResults.some(s => s.includes("Mint Tea"))).toBe(true);
    });

    it("test ordering two items", function () {
        handleInput("hello");
        handleInput("1");          // chicken tagine
        handleInput("small");
        handleInput("mild");
        handleInput("yes");        // add another item
        handleInput("2");          // lamb couscous
        handleInput("medium");
        handleInput("no");         // no raisins
        handleInput("no");         // no more items
        const aResults = handleInput("no"); // no mint tea
        expect(aResults.some(s => s.includes("Small Chicken Tagine"))).toBe(true);
        expect(aResults.some(s => s.includes("Medium Lamb Couscous"))).toBe(true);
    });

    it("test state resets after order", function () {
        handleInput("hello");
        handleInput("1");
        handleInput("small");
        handleInput("mild");
        handleInput("no");
        handleInput("no");
        // State should be reset — calling hello again should work
        const aResults = handleInput("hello");
        expect(aResults[0]).toBe("Welcome to Dar Medina Moroccan Kitchen!");
    });

});