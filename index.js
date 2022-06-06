const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const apiRoute = require("./routes/report");

dotenv.config();
// middlewares:- (request-middlewares)
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("yehh! connected to Db");
	}
);

app.use("/api", apiRoute);

app.listen(5000, () => {
	console.log("yehh! server started at portno:-5000");
});
