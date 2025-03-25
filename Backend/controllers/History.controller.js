import { crimeRegFormModel } from "../models/crimeRegForm.model.js";

export const history_controller = async (req, res) => {

    try {
        const data = req.body.username;
        const records = await crimeRegFormModel.find({ username: data })
        if (records.length === 0) {
            return res.status(200).send({ message: "No records found!", records: [] });
        }

        res.status(200).send({ message: "Records found", records });
    }
    catch (error) {
        console.log(error);

        res.status(400).send({ message: 'Something went wrong while finding  the user history ! ', error })


    };









}