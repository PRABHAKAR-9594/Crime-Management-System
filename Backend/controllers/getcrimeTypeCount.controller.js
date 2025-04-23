import { crimeRegFormModel } from "../models/crimeRegForm.model.js"; // Update the path/model name if needed

export const getcrimeTypeCount = async (req, res) => {
  try {
    // Fetch all crime reports from the database
    const crimeReports = await crimeRegFormModel.find({});

    // Initialize an object to count occurrences of each crime type
    let crimeTypeCounts = {};

    // Iterate through the crime reports
    crimeReports.forEach((report) => {
      const crimeType = report.crimetype?.toLowerCase(); // Get the crime type

      // Only count if crimeType exists
      if (crimeType) {
        if (!crimeTypeCounts[crimeType]) {
          crimeTypeCounts[crimeType] = 1;
        } else {
          crimeTypeCounts[crimeType]++;
        }
      }
    });

    // Prepare the response with only the crime type counts
    res.status(200).json(crimeTypeCounts);
  } catch (error) {
    console.error("Error fetching crime type counts:", error);
    res.status(500).json({ message: "Error fetching crime type counts" });
  }
};
