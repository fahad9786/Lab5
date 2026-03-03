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

export function getOrder() {
  return currentOrder;
}

function welcoming() {
  currentState = choosingItem;
  currentOrder = [];
  currentItem = {};
  return [
    "🌙 Marhaba! Welcome to Dar Medina Moroccan Kitchen.",
    "Our menu:\n1. Tagine\n2. Couscous\nWhat would you like? (type 'tagine' or 'couscous')"
  ];
}

function choosingItem(sInput) {
  const input = sInput.toLowerCase().trim();
  if (input.includes("tagine")) {
    currentItem = { name: "Tagine" };
    currentState = choosingSize;
    return ["Great choice! 🏺", "What size?\n• Small ($14)\n• Large ($20)"];
  } else if (input.includes("couscous")) {
    currentItem = { name: "Couscous" };
    currentState = choosingSize;
    return ["Excellent! 🌿", "What size?\n• Small ($12)\n• Large ($18)"];
  }
  return ["Please type 'tagine' or 'couscous'."];
}

function choosingSize(sInput) {
  const input = sInput.toLowerCase().trim();
  if (input.includes("small")) {
    currentItem.size = "Small";
    currentItem.price = currentItem.name === "Tagine" ? 14 : 12;
    currentState = choosingProtein;
    return ["Small it is!", "Choose your protein:\n• Lamb 🐑\n• Chicken 🍗\n• Veggie 🥕"];
  } else if (input.includes("large")) {
    currentItem.size = "Large";
    currentItem.price = currentItem.name === "Tagine" ? 20 : 18;
    currentState = choosingProtein;
    return ["Large — good appetite!", "Choose your protein:\n• Lamb 🐑\n• Chicken 🍗\n• Veggie 🥕"];
  }
  return ["Please type 'small' or 'large'."];
}

function choosingProtein(sInput) {
  const input = sInput.toLowerCase().trim();
  const match = ["lamb", "chicken", "veggie"].find(p => input.includes(p));
  if (match) {
    currentItem.protein = match.charAt(0).toUpperCase() + match.slice(1);
    currentOrder.push({ ...currentItem });
    currentState = upselling;
    return [
      `${currentItem.protein} added! 🎉`,
      "Would you like a drink?\n• Mint Tea 🍵 ($3)\n• Mango Lassi 🥭 ($4)\n• Water 💧 ($1)\n• No thanks"
    ];
  }
  return ["Please type 'lamb', 'chicken', or 'veggie'."];
}

function upselling(sInput) {
  const input = sInput.toLowerCase().trim();
  let aReturn = [];
  if (input.includes("mint") || input.includes("tea")) {
    currentOrder.push({ name: "Mint Tea", size: "-", protein: "-", price: 3 });
    aReturn.push("Mint tea — perfect pairing ☕");
  } else if (input.includes("mango") || input.includes("lassi")) {
    currentOrder.push({ name: "Mango Lassi", size: "-", protein: "-", price: 4 });
    aReturn.push("Mango lassi — refreshing! 🥭");
  } else if (input.includes("water")) {
    currentOrder.push({ name: "Water", size: "-", protein: "-", price: 1 });
    aReturn.push("Water, coming up 💧");
  } else {
    aReturn.push("No drink — no worries!");
  }
  currentState = addingMore;
  aReturn.push("Would you like to add another item? (yes / no)");
  return aReturn;
}

function addingMore(sInput) {
  const input = sInput.toLowerCase().trim();
  if (input.startsWith("y")) {
    currentItem = {};
    currentState = choosingItem;
    return [
      "What else can we get you?",
      "Our menu:\n1. Tagine\n2. Couscous\n(type 'tagine' or 'couscous')"
    ];
  }
  const total = currentOrder.reduce((sum, item) => sum + item.price, 0);
  const summary = currentOrder
    .map(i => `• ${i.name}${i.size !== "-" ? ` (${i.size}, ${i.protein})` : ""} — $${i.price}`)
    .join("\n");
  currentState = welcoming;
  currentOrder = [];
  return [
    `📋 Your order:\n${summary}`,
    `💰 Total: $${total}\n\nShukran! Ready in ~25 mins. 🌙`
  ];
}