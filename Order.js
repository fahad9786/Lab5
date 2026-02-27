let currentState = welcoming;
let currentOrder = [];
let currentItem = {};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput() {
  currentState = welcoming;
  currentOrder = [];
  currentItem = {};
}

function welcoming() {
  let aReturn = [];
  currentState = choosingItem;
  aReturn.push("Welcome to Dar Medina Moroccan Kitchen!");
  aReturn.push("What would you like to order?");
  aReturn.push("1) Chicken Tagine  2) Lamb Couscous");
  return aReturn;
}

function choosingItem(sInput) {
  let aReturn = [];
  if (sInput.trim() === "1" || sInput.toLowerCase().includes("chicken")) {
    currentItem.name = "Chicken Tagine";
    currentState = choosingTagineSize;
    aReturn.push("Great choice! What size would you like your Chicken Tagine?");
    aReturn.push("Small / Medium / Large");
  } else if (sInput.trim() === "2" || sInput.toLowerCase().includes("lamb")) {
    currentItem.name = "Lamb Couscous";
    currentState = choosingCouscousSize;
    aReturn.push("Excellent! What size would you like your Lamb Couscous?");
    aReturn.push("Small / Medium / Large");
  } else {
    aReturn.push("Sorry, I didn't catch that. Please choose:");
    aReturn.push("1) Chicken Tagine  2) Lamb Couscous");
  }
  return aReturn;
}

function choosingTagineSize(sInput) {
  let aReturn = [];
  const sSize = parseSize(sInput);
  if (sSize) {
    currentItem.size = sSize;
    currentState = choosingSpice;
    aReturn.push(`${sSize} Chicken Tagine — got it!`);
    aReturn.push("What spice level would you like?");
    aReturn.push("Mild / Medium / Spicy");
  } else {
    aReturn.push("Please choose a size: Small / Medium / Large");
  }
  return aReturn;
}

function choosingCouscousSize(sInput) {
  let aReturn = [];
  const sSize = parseSize(sInput);
  if (sSize) {
    currentItem.size = sSize;
    currentState = choosingRaisins;
    aReturn.push(`${sSize} Lamb Couscous — got it!`);
    aReturn.push("Would you like to add raisins? Yes / No");
  } else {
    aReturn.push("Please choose a size: Small / Medium / Large");
  }
  return aReturn;
}

function choosingSpice(sInput) {
  let aReturn = [];
  const s = sInput.toLowerCase();
  if (s.startsWith("mi")) {
    currentItem.spice = "Mild";
  } else if (s.startsWith("me")) {
    currentItem.spice = "Medium";
  } else if (s.startsWith("sp")) {
    currentItem.spice = "Spicy";
  } else {
    aReturn.push("Please choose a spice level: Mild / Medium / Spicy");
    return aReturn;
  }
  currentOrder.push({ ...currentItem });
  currentItem = {};
  currentState = addingAnother;
  aReturn.push(`Added: ${currentOrder[currentOrder.length - 1].size} Chicken Tagine (${currentOrder[currentOrder.length - 1].spice})`);
  aReturn.push("Would you like to add another item? Yes / No");
  return aReturn;
}

function choosingRaisins(sInput) {
  let aReturn = [];
  const s = sInput.toLowerCase();
  if (s.startsWith("y")) {
    currentItem.raisins = "with raisins";
  } else if (s.startsWith("n")) {
    currentItem.raisins = "no raisins";
  } else {
    aReturn.push("Would you like to add raisins? Yes / No");
    return aReturn;
  }
  currentOrder.push({ ...currentItem });
  currentItem = {};
  currentState = addingAnother;
  aReturn.push(`Added: ${currentOrder[currentOrder.length - 1].size} Lamb Couscous (${currentOrder[currentOrder.length - 1].raisins})`);
  aReturn.push("Would you like to add another item? Yes / No");
  return aReturn;
}

function addingAnother(sInput) {
  let aReturn = [];
  if (sInput.toLowerCase().startsWith("y")) {
    currentState = choosingItem;
    aReturn.push("What else would you like?");
    aReturn.push("1) Chicken Tagine  2) Lamb Couscous");
  } else {
    currentState = upselling;
    aReturn.push("Would you like to add a Mint Tea to your order? Yes / No");
  }
  return aReturn;
}

function upselling(sInput) {
  let aReturn = [];
  if (sInput.toLowerCase().startsWith("y")) {
    currentOrder.push({ name: "Mint Tea", size: "", spice: "", raisins: "" });
    aReturn.push("Mint Tea added — a perfect finish!");
  } else {
    aReturn.push("No problem!");
  }
  currentState = welcoming;
  aReturn.push("Here is your order summary:");
  currentOrder.forEach(function (item) {
    if (item.name === "Mint Tea") {
      aReturn.push("- Mint Tea");
    } else if (item.name === "Chicken Tagine") {
      aReturn.push(`- ${item.size} Chicken Tagine (${item.spice})`);
    } else if (item.name === "Lamb Couscous") {
      aReturn.push(`- ${item.size} Lamb Couscous (${item.raisins})`);
    }
  });
  aReturn.push("Thank you for dining with Dar Medina Moroccan Kitchen! Shukran!");
  currentOrder = [];
  return aReturn;
}

function parseSize(sInput) {
  const s = sInput.toLowerCase();
  if (s.startsWith("sm") || s === "s") return "Small";
  if (s.startsWith("me") || s === "m") return "Medium";
  if (s.startsWith("la") || s === "l") return "Large";
  return null;
}
