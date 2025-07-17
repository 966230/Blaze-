const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (text === 'hi') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'Hello! I am Blaze 🤖' });
    }
  });
}

app.get('/', (req, res) => res.send('Blaze Bot is Running!'));
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
  startSock();
});
