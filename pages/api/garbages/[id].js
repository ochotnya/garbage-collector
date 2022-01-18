import Garbage from "../../../models/garbageModel";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function (req, res) {
  const { method } = req;
  switch (method) {
    // before deleting, check if requesting user is author of this item
    case "DELETE":
      const { id } = req.query;
      const session = getSession(req, res);
      const itemToCheck = await Garbage.findById(id);
      if (itemToCheck.createdBy === session.user.sub) {
        await Garbage.deleteOne({ _id: id });
        res.status(200).json({ message: "deleted" });
      } else res.status(500).json({ message: "not authorized" });
      break;

    default:
      break;
  }
});
