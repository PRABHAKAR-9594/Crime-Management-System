import { crimeRegFormModel } from "../models/crimeRegForm.model.js"; // Update the path/model name if needed

export const getAllCrimeDetails = async (req, res) => {
    try {
        // Fetch all crime reports from the database
        const crimeReports = await crimeRegFormModel.find({});

        // Format each crime report for frontend display
        const formattedReports = crimeReports.map((report) => ({
            username: report.username || '',
            crimetype: report.crimetype || '',
            description: report.description || '',
            incidentDate: report.incidentDate || '',
            incidentTime: report.incidentTime || '',
            incidentLocation: {
                address: report.incidentLocation?.address || '',
                city: report.incidentLocation?.city || '',
                state: report.incidentLocation?.state || '',
                pincode: report.incidentLocation?.pincode || ''
            },
            evidence: report.evidence || {}, // Keep this open-ended if structure varies
            suspectDetails: {
                name: report.suspectDetails?.name || '',
                description: report.suspectDetails?.description || ''
            },
            acknowledgeNumber: report.acknowledgeNumber || '',
            status: report.status || 'Pending',
            assignedOfficer: {
                UserName: report.assignedOfficer?.UserName || '',
                Name: report.assignedOfficer?.Name || '',
                contact: report.assignedOfficer?.contact || ''
            },
            createdAt: report.createdAt
                ? new Date(report.createdAt).toLocaleString()
                : 'N/A',
            updatedAt: report.updatedAt
                ? new Date(report.updatedAt).toLocaleString()
                : 'N/A'
        }));

        // Send response
        res.status(200).json(formattedReports);

    } catch (error) {
        console.error("Error fetching crime details:", error);
        res.status(500).json({ message: "Error fetching crime details" });
    }
};
