export const CrimeRegistrationMiddleware = (req, res, next) => {
    try {
        const { 
            username, crimetype, description, incidentDate, incidentTime, 
            incidentLocation, evidence, suspectDetails, acknowledgeNumber, 
            status, assignedOfficer 
        } = req.body;

        // Required Fields Validation
        if (!username) {
            return res.status(400).send({ message: 'Please enter the username!' });
        }
        if (!crimetype) {
            return res.status(400).send({ message: 'Please enter the crime type!' });
        }
        if (!description) {
            return res.status(400).send({ message: 'Please provide a description!' });
        }
        if (!incidentDate) {
            return res.status(400).send({ message: 'Please provide the incident date!' });
        }
        if (!incidentTime) {
            return res.status(400).send({ message: 'Please provide the incident time!' });
        }

        // Nested Object Validation: Incident Location
        if (!incidentLocation?.address) {
            return res.status(400).send({ message: 'Please provide the incident location address!' });
        }
        if (!incidentLocation?.city) {
            return res.status(400).send({ message: 'Please provide the incident location city!' });
        }
        if (!incidentLocation?.state) {
            return res.status(400).send({ message: 'Please provide the incident location state!' });
        }
        if (!incidentLocation?.pincode) {
            return res.status(400).send({ message: 'Please provide the incident location pincode!' });
        }

        // Optional Field Validation
        if (status && !['Open', 'Under investigation', 'Closed'].includes(status)) {
            return res.status(400).send({ 
                message: 'Invalid status value! Valid values are: Open, Under investigation, Closed.' 
            });
        }

        if (evidence) {
            if (evidence.imageFile && typeof evidence.imageFile !== 'string') {
                return res.status(400).send({ message: 'Image file must be a string!' });
            }
            if (evidence.videoFile && typeof evidence.videoFile !== 'string') {
                return res.status(400).send({ message: 'Video file must be a string!' });
            }
        }

        if (suspectDetails) {
            if (suspectDetails.name && typeof suspectDetails.name !== 'string') {
                return res.status(400).send({ message: 'Suspect name must be a string!' });
            }
            if (suspectDetails.description && typeof suspectDetails.description !== 'string') {
                return res.status(400).send({ message: 'Suspect description must be a string!' });
            }
        }

        if (assignedOfficer) {
            if (assignedOfficer.UserName && typeof assignedOfficer.UserName !== 'string') {
                return res.status(400).send({ message: 'Assigned officer username must be a string!' });
            }
            if (assignedOfficer.Name && typeof assignedOfficer.Name !== 'string') {
                return res.status(400).send({ message: 'Assigned officer name must be a string!' });
            }
            if (assignedOfficer.contact && typeof assignedOfficer.contact !== 'string') {
                return res.status(400).send({ message: 'Assigned officer contact must be a string!' });
            }
        }

        // If all validations pass, proceed to the next middleware
        next();
    } catch (error) {
        return res.status(500).send({
            message: 'An unexpected error occurred during validation',
            error: error.message
        });
    }
};
