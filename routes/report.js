const router = require("express").Router();
const reports = require("../controllers/reports");

router.post("/reports", reports.getReport);
router.get("/reports/:reportID", reports.sendReport);

module.exports = router;
