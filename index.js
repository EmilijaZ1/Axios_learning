import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
var act = "";
var act_type = "";
var act_part = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  console.log(act);
  res.render("index.ejs", { data: act, type: act_type, part: act_part });
});

app.post("/", async (req, res) => {
  try {
    act_type = req.body.type;
    act_part = req.body.participants;
    const activities = await axios.get(`https://bored-api.appbrewery.com/filter?type=${act_type}&participants=${act_part}`);
    act = activities.data[Math.floor(Math.random() * activities.data.length)].activity;
    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    act = "No activities that match your criteria.";
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
