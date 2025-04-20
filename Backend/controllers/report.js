const Report = require("../models/report");

//  api/report
const submitReport = async (req, res) => {
    try {
        const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = req.body;

        if (!ngoId || !month || !peopleHelped || !eventsConducted || !fundsUtilized) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const report = new Report({ ngoId, month, peopleHelped, eventsConducted, fundsUtilized });
        await report.save();
        res.status(201).json({ message: "Report submitted successfully" });
    } catch (error) {
        console.error("Submit report error:", error);
        res.status(500).json({ error: "Failed to submit report" });
    }
};

// api/reports 
const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        console.error("Fetch all reports error:", error);
        res.status(500).json({ error: "Failed to fetch reports" });
    }
};

// api/dashboard?month=YYYY-MM 
const getDashboardData = async (req, res) => {
    const { month } = req.params;

    if (!month) {
        return res.status(400).json({ error: "Month query parameter is required (YYYY-MM)" });
    }

    try {
        const reports = await Report.find({ month });

        const totalNGOs = new Set(reports.map(r => r.ngoId)).size;
        const totalPeopleHelped = reports.reduce((sum, r) => sum + r.peopleHelped, 0);
        const totalEvents = reports.reduce((sum, r) => sum + r.eventsConducted, 0);
        const totalFunds = reports.reduce((sum, r) => sum + r.fundsUtilized, 0);

        res.json({
            month,
            totalNGOs,
            totalPeopleHelped,
            totalEvents,
            totalFunds
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
};

module.exports = {
    submitReport,
    getAllReports,
    getDashboardData
};
