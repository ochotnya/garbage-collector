import dbConnect from "../../utils/dbConnect";
import userModel from '../../models/userModel';
dbConnect()

export default async (req,res) =>{
  const {method} = req;
  switch (method) {
    case 'GET':
      console.log("fetching")
      try {
        const users = await userModel.find({})

        res.status(200).json({data: users})
      } catch (error) {
        res.status(400).json({message: 'failed'})
      }
      break;
  
    default:
      break;
  }
}