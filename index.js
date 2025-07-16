const venom = require('venom-bot');

venom.create().then(client => start(client)).catch(console.error);

function start(client) {
  client.onMessage(async msg => {
    const time = new Date().getHours();

    if (time < 9 || time >= 21) {
      return client.sendText(msg.from, '🚫 Blaze अभी ऑफलाइन है।\nकृपया सुबह 9 बजे वापस आएं।');
    }

    const body = msg.body.trim().toUpperCase();

    if (body === 'HI' || body === 'HELLO') {
      return client.sendText(msg.from, '🔥 Blaze here! Products के codes भेजिए (जैसे P001)');
    }

    const productMap = {
      "P001": { name: "Red T‑Shirt", price: 20, pay: "https://rzp.io/l/demoP001" },
      "P002": { name: "Blue Jeans", price: 20, pay: "https://rzp.io/l/demoP002" }
    };

    if (productMap[body]) {
      const p = productMap[body];
      return client.sendText(msg.from,
        `🛒 Product: ${p.name}\n💰 Price: ₹${p.price}\n\nOrder now: ${p.pay}`);
    }

    return client.sendText(msg.from, '⚠️ Invalid code! Example: P001');
  });
}
