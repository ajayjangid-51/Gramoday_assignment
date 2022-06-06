const reportsCollection = require("../models/report");
const getReport = async (req, res) => {
	console.log(req.body);
	try {
		const { cmdtyID, marketID } = req.body.reportDetails;
		const rpt = await reportsCollection.find({
			cmdtyID: cmdtyID,
			marketID: marketID,
		});

		if (rpt.length > 0) {
			let xx = req.body.reportDetails.price / req.body.reportDetails.convFctr;
			console.log(`the xx is:= ${xx}`);
			// xx = xx / 2;
			console.log(`the xx is:= ${xx}`);

			const pt = (rpt[0].price + xx) / 2;
			console.log(`the rpt.price is:= ${rpt[0].price}`);
			console.log(`the pt is:= ${pt}`);

			const rptt = await reportsCollection.findByIdAndUpdate(rpt[0]._id, {
				price: pt,
			});
			res.status(200).send({ status: "succuess updated", reportID: rptt._id });
		} else {
			const newReport = new reportsCollection({
				cmdtyName: req.body.reportDetails.cmdtyName,
				cmdtyID: req.body.reportDetails.cmdtyID,
				marketID: req.body.reportDetails.marketID,
				marketName: req.body.reportDetails.marketName,
				users: [req.body.reportDetails.userID],
				timestamps: new Date().getMilliseconds(),
				price: req.body.reportDetails.price / req.body.reportDetails.convFctr,
			});
			const report = await newReport.save();
			res.status(200).send({
				status: "success",
				reportID: report._id,
			});
		}
	} catch (err) {
		console.log("some error occured at getReport-controller-function:-");
		console.log(err);
		res.status(500).send({ eror: err });
	}
};

const sendReport = async (req, res) => {
	try {
		const rpt = await reportsCollection.findById(req.params.reportID);
		if (rpt) {
			res.status(200).send({ rpt });
		} else {
			res.status(300).send({ message: "no report of this ID is present" });
		}
	} catch (error) {
		console.log(`some error occured at /:reportID ${error} `);
	}
};
module.exports = { getReport, sendReport };
