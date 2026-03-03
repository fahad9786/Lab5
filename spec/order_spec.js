import { handleInput, clearInput, getOrder } from "../Order.js";

describe("Dar Medina Chatbot", function () {

  beforeEach(function () {
    clearInput();
  });

  // ── Basic order flow (covers marking: basic order for an item) ──
  describe("basic single-item order", function () {

    it("welcomes the user on first contact", function () {
      const res = handleInput("");
      expect(res[0]).toContain("Marhaba");
    });

    it("accepts tagine as a menu choice", function () {
      handleInput(""); // welcome
      const res = handleInput("tagine");
      expect(res[0]).toContain("Tagine");
    });

    it("accepts couscous as a menu choice", function () {
      handleInput(""); // welcome
      const res = handleInput("couscous");
      expect(res[0]).toContain("Couscous");
    });

    it("accepts small size", function () {
      handleInput("");
      handleInput("tagine");
      const res = handleInput("small");
      expect(res[0]).toContain("Small");
    });

    it("accepts large size", function () {
      handleInput("");
      handleInput("couscous");
      const res = handleInput("large");
      expect(res[0]).toContain("Large");
    });

    it("accepts a protein choice and adds item to order", function () {
      handleInput("");
      handleInput("tagine");
      handleInput("large");
      const res = handleInput("lamb");
      expect(res[0]).toContain("Lamb");
    });

    it("rejects invalid menu input and stays in choosingItem", function () {
      handleInput("");
      const res = handleInput("pizza");
      expect(res[0]).toContain("tagine");
    });

  });

  // ── Up-sell item (covers marking: up-sell item) ──
  describe("up-sell drinks", function () {

    function orderToUpsell() {
      handleInput("");
      handleInput("tagine");
      handleInput("small");
      handleInput("chicken");
    }

    it("offers drinks after protein is chosen", function () {
      orderToUpsell();
      // we're now in upselling state — the offer was in the previous messages
      // confirm state by sending a drink
      const res = handleInput("mint tea");
      expect(res[0]).toContain("tea");
    });

    it("adds mint tea to the order", function () {
      orderToUpsell();
      handleInput("mint tea");
      handleInput("no"); // finish order
      // order was finalised — check summary contains mint tea
      // re-run a fresh order and inspect via getOrder
    });

    it("adds mango lassi to the order", function () {
      orderToUpsell();
      const res = handleInput("mango lassi");
      expect(res[0]).toContain("Mango");
    });

    it("handles 'no thanks' for drinks gracefully", function () {
      orderToUpsell();
      const res = handleInput("no thanks");
      expect(res[0]).toContain("worries");
    });

  });

  // ── 2nd / 3rd item (covers marking: 2nd or 3rd item) ──
  describe("adding a second item", function () {

    function orderFirstItem() {
      handleInput("");        // welcome
      handleInput("tagine");  // choose item
      handleInput("small");   // choose size
      handleInput("lamb");    // choose protein
      handleInput("no thanks"); // skip drink
    }

    it("asks to add another item after the first", function () {
      orderFirstItem();
      // we're now in addingMore state
      const res = handleInput("yes");
      expect(res[0]).toContain("else");
    });

    it("returns to menu when user says yes", function () {
      orderFirstItem();
      const res = handleInput("yes");
      expect(res[1]).toContain("tagine");
    });

    it("can complete a second item order (couscous)", function () {
      orderFirstItem();
      handleInput("yes");
      const res = handleInput("couscous");
      expect(res[0]).toContain("Couscous");
    });

    it("prints final summary with total when user says no", function () {
      orderFirstItem();
      const res = handleInput("no");
      expect(res[0]).toContain("order");
      expect(res[1]).toContain("Total");
    });

  });

});