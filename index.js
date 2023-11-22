import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apikey="f857729bfa08878dadf48e7adc31a5a2";
const url="https://api.openweathermap.org/data/2.5/weather";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));







app.get("/", async(req, res) => {
    const result=await axios.get(url,{
        params: {
            q: "kolkata",
            appid: apikey,
            units:"metric"
          }
    })
    res.render("index.ejs",{ location: JSON.stringify(result.data) });
});

app.post("/", async(req, res) =>{
    const location=req.body.search;
    try{
        const result=await axios.get(url,{
            params: {
                q: location,
                appid: apikey,
                units:"metric"
              }
        })
        console.log(result.data);
        res.render("index.ejs",{ location: JSON.stringify(result.data) });
    }
    catch(error)
    {
        res.redirect(`/?error=1`);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });