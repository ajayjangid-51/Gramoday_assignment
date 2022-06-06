const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
	{
		cmdtyName: {
			type: String,
		},
		cmdtyID: {
			type: String,
			unique: true,
			required: true,
		},
		marketID: {
			type: String,
			unique: true,
			required: true,
		},
		marketName: {
			type: String,
		},
		users: {
			type: Array,
			default: [],
		},
		timestamps: {
			type: String,
		},
		priceUnit: {
			type: String,
			default: "kg",
		},
		price: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const reportCollection = mongoose.model("reports", reportSchema);
module.exports = reportCollection;
