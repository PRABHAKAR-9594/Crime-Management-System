import { missingPersonModel } from "../models/missingReg.form.model.js";

export const MissingOpenCaseDetails_controller = async (req, res) => {
    const officerUserName = req.body.officerUserName
    try {
        
        const records = await missingPersonModel.find({ "assignedOfficer.UserName":officerUserName ,"status":"Under investigation"})
        if (records.length === 0) {
            return res.status(200).send({ message: "No records found!", records: [] });
        }

        res.status(200).send({ message: "Records found", records });
    }
    catch (error) {
        console.log(error);

        res.status(400).send({ message: 'Something went wrong while finding  case details  ! ', error })


    }};




    // For closing the ticket

    export const MissingOpenCaseCloseTicket_controller = async (req, res) => {
        try {
            const acknowledgeNumber = req.body.acknowledgeNumber;
        
            
        
            // Check if case exists
            const caseExists = await missingPersonModel.findOne({ acknowledgeNumber });
            if (!caseExists) {
              return res.status(404).json({ message: "Case not found" });
            }
        
            // Update the assigned officer
           
        
            // Change status to 'Under investigation'
            caseExists.status = "Closed";
        
            // Save the changes
            const updatedCase = await caseExists.save();
        
            res.status(200).json({
              message: "Case Closed Successfully !",
              caseData: updatedCase, // Return full updated document
            });
        
          } catch (error) {
            console.error("Error updating officer:", error);
            res.status(500).json({ message: "Server error", error: error.message });
          }
        };