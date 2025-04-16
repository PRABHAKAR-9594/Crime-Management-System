import { missingPersonModel } from "../models/missingReg.form.model.js"

export const MissingTakeCase_controller = async (req, res) => {
    const status = req.body.status

        if(!status){
            return res.status(404).send({ message: "Plese enter the status !"});
        }
    try {
        const response = await missingPersonModel.find({
             status: status
        })
        if (response.length === 0) {
            return res.status(200).send({ message: "No records found!", records: [] });
        }

        res.status(200).send({ message: "Records found", response });
    }
    catch (error) {
        res.status(404).send({ "message": 'Something went wrong In Take Case page !', error })
    }

}











// For updating the officer

// Controller to update assigned officer details using acknowledgeNumber


// Controller to update assigned officer details using acknowledgeNumber from request body
export const MissingupdateAssignedOfficer_controller = async (req, res) => {
    try {
        const { acknowledgeNumber, username, name, contact } = req.body;
    
        if (!acknowledgeNumber || !username || !name || !contact) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        // Check if case exists
        const caseExists = await missingPersonModel.findOne({ acknowledgeNumber });
        if (!caseExists) {
          return res.status(404).json({ message: "Case not found" });
        }
    
        // Update the assigned officer
        caseExists.assignedOfficer = {
          UserName: username,
          Name: name,
          contact: contact,
        };
    
        // Change status to 'Under investigation'
        caseExists.status = "Under investigation";
    
        // Save the changes
        const updatedCase = await caseExists.save();
    
        res.status(200).json({
          message: "Assigned officer updated successfully",
          caseData: updatedCase, // Return full updated document
        });
    
      } catch (error) {
        console.error("Error updating officer:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    };