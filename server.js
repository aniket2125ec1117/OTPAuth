const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const port = 3001;


const client = require('twilio')(process.env.accountSid, process.env.authToken);

const random = Math.floor(Math.random(6)*1000000)

// Function to send a text message
function sendTextMessage() {
    client.messages
      .create({
        body: `Your OTP is ${random}`,
        to: '+918102856535', // Text your number
        from: '+12176948158', // From a valid Twilio number
      })
      .then((message) => {
          console.log('Message SID:', message.sid);
          console.log('Request:', client.httpClient.lastRequest);
          console.log('Response:', client.httpClient.lastResponse);
        })
      .catch((error) => console.error('Error sending message:', error));
  }

app.get('/', (req, res) => {
  // Call the function to send the text message when the server starts
  sendTextMessage();
  res.send(`
    <div style="text-align:center; padding-top:40px;">
      <h1>Your message has been sent successfully</h1>
      <p>This is hello world</p>
    </div>
  `);
});

app.listen(port, () => {
  console.log('Server is listening on port', port);

});
