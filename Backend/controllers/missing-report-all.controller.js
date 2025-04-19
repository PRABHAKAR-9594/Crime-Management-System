import { missingPersonModel } from "../models/missingReg.form.model.js";

export const getAllMissingReports = async (req, res) => {
    try {
        // Fetch missing reports from the database
        const missingReports = await missingPersonModel.find({});

        // Map over the fetched data to format it to match the frontend
        const formattedReports = missingReports.map((report) => ({
            name: report.missingPerson?.fullName || '',
            age: report.missingPerson?.age || '',
            gender: report.missingPerson?.gender || '',
            lastSeen: report.lastSeenDetails?.location || '',
            // Format the dateMissing field to a readable format
            dateMissing: report.lastSeenDetails?.date
                ? new Date(report.lastSeenDetails?.date).toLocaleDateString()
                : 'N/A',  // Default to 'N/A' if no dateMissing
            status: report.status || '',
            officer: report.assignedOfficer?.Name || 'Not Assigned', // Default to "Not Assigned" if no officer
            contact: report.missingPerson?.contact || '',
            photo: report.missingPerson?.photo || 'default.jpg', // Handle default photo if not available
        }));

        // Return the formatted missing persons data
        res.status(200).json(formattedReports);

    } catch (error) {
        console.error("Error fetching missing reports:", error); // Log error for debugging
        res.status(500).json({ message: "Error fetching missing reports" });
    }
};
