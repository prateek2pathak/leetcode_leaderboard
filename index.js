const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.static("public"));
const port = 4040;

const ids = [
  [0, "prateek6969"],
  [0, "coderman2004"],
  [0, "mahavir21"],
  [0, "gopal_91"],
];

app.get("/", async (req, res) => {
  
  try {
    const promises = ids.map(async (id) => {
      const resp = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${id[1]}`);
      const api_res= await axios.get(`https://alfa-leetcode-api.onrender.com/${id[1]}`);
      const user_data=api_res.data;
      // NExt day target save name and user pic in database
      return { id: id[1], totalSolved: resp.data.totalSolved,name:user_data.name,pic:user_data.avatar};
    });

    // Returning array with json format data
    const results = await Promise.all(promises);
  
    const sortedIds = results.sort((a, b) => a.totalSolved - b.totalSolved);
    sortedIds.reverse();

    console.log(sortedIds);

    
    

    res.render("index.ejs", { arr: sortedIds });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
  
  
});

app.listen(4040, () => {
  console.log("Server is UP on port 4040");
});
