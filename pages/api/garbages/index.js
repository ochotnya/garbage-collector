import dbConnect from "../../../utils/dbConnect";
import Garbage from "../../../models/garbageModel";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { addDaysToDate } from "../../../utils/helperFunctions";
dbConnect();

export default withApiAuthRequired(async (req, res) => {
  const { method } = req;
  const session = getSession(req, res);
  switch (method) {
    case "GET":
      try {
        const garbages = await Garbage.find({
          $or: [
            { sharedTo: [session.user.email] },
            { createdBy: session.user.sub },
          ],
        }).sort("removeDate");
        res.status(200).json({ garbages });
      } catch (error) {
        res.status(400).json({ message: "failed" });
      }
      break;

    case "POST":
      const creationDate = new Date();

      try {
        const days = JSON.parse(req.body.expireIn);
        const newGarbage = new Garbage({
          ownerName: session.user.name,
          sharedTo: req.body.sharedTo,
          removeDate: addDaysToDate(creationDate, days),
          createdOn: creationDate,
          createdBy: session.user.sub,
          content: req.body.content,
        });

        console.log(newGarbage);
        newGarbage.save();
        res
          .status(201)
          .json({ message: `Added task titled ${newGarbage.ownerName}` });
      } catch (error) {
        res.status(400).json({ message: "failed" });
      }
      break;
    default:
      break;
  }
});
