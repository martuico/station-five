const express = require('express')
const app = express()
app.use(express.json());

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/message', (req, res) => {
  var words = [{greetings: 'hello', message: "Welcome to StationFive."},
              {greetings: 'hi', message: "Welcome to StationFive." },
              {greetings: 'Goodbye', message: "Thank you, see you around." },
              {greetings: 'bye', message: "Thank you, see you around." }
            ];
  if(!(req.body.conversation_id && req.body.message)) {
    throw new Error('Please provide necessary fields');
  }

  try {
    const message = req.body.message ? req.body.message : ""
    const word = words.filter((word) =>
      new RegExp(word.greetings).test(message.toLowerCase())
    )

    res.status(200).json({
      response_id: req.body.conversation_id,
      response: (word.length > 0) ? word[0].message: "Sorry, I don’t understand."
    })
  } catch(e) {
    // throw new Error(`Request aborted`);
    return
  }

})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;