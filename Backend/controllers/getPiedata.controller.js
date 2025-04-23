import { crimeRegFormModel } from "../models/crimeRegForm.model.js"; // Update the path/model name if needed

export const getPiedata = async (req, res) => {
  try {
    // Fetch all crime reports from the database
    const crimeReports = await crimeRegFormModel.find({});

    // Initialize counters
    let open = 0;
    let underInvestigation = 0;
    let closed = 0;

    // Count based on status field
    crimeReports.forEach((report) => {
      const status = report.status?.toLowerCase();

      if (status === "open") open++;
      else if (status === "under investigation") underInvestigation++;
      else if (status === "closed") closed++;
    });

    // Send counts as response
    res.status(200).json({
      open,
      underInvestigation,
      closed,
    });

  } catch (error) {
    console.error("Error fetching crime status counts:", error);
    res.status(500).json({ message: "Error fetching crime status counts" });
  }
};
