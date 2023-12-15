require("dotenv").config()
const express = require("express")
const cors = require('cors')

const themesRouter = require("./routes/themes")
const businessesRouter = require("./routes/businesses")



const app = express()
const port = 3000

app.use(cors())
app.use("/themes", themesRouter)
app.use("/businesses", businessesRouter)


app.get("/", async (req, res) => {

    res.json({
        data: {
            v: "updated"
        }
    })
})

app.listen(port, () => { console.log(`http://localhost:${port}`); })