import { criminalmodel } from "../models/criminal.model.js"; // Update the path and model name if needed

export const getAllCriminalRecords = async (req, res) => {
    try {
        // Fetch criminal records from the database
        const records = await criminalmodel.find({});

        // Format each record for frontend display
        const formattedRecords = records.map((record) => ({
            firstname: record.firstname || '',
            lastname: record.lastname || '',
            dob: record.dob || '',
            height: record.height || '',
            weight: record.weight || '',
            adharnumber: record.adharnumber || '',
            crimetype: record.crimetype || '',
            criminalImg: record.criminalImg || 'default.jpg', // Use default if no image
            desc: record.desc || '',
            createdAt: record.createdAt
                ? new Date(record.createdAt).toLocaleString()
                : 'N/A',
            updatedAt: record.updatedAt
                ? new Date(record.updatedAt).toLocaleString()
                : 'N/A'
        }));

        // Send formatted response
        res.status(200).json(formattedRecords);

    } catch (error) {
        console.error("Error fetching criminal records:", error);
        res.status(500).json({ message: "Error fetching criminal records" });
    }
};
