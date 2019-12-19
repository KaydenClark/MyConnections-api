const express = require('express')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000

// The "Database" we are making changes

app.use(express.json());
app.use(cors());

app.post('/signin', async(req, res) => {
    const userData = req.body
    res.send()
})

app.listen(port, () => console.log(`Signin listening on port ${port}!`))