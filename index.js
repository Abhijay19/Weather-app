import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "5abba514254b6efb6ad1f98af2985b7e"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.post("/submit", async (req,res) => {
    const name = req.body.cName;
    try {
        const result = await axios.get(API_URL + `q=${name}&appid=${apiKey}&units=metric`);
        const data = result.data
        console.log(data.weather[0].description)
        res.render("index.ejs", { content: data });
      } catch (error) {
        res.render("index.ejs", { contentErr: error.response.data });
      }
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})