import Garbage from "../../../models/garbageModel";

export default async function garbage(req, res) {
  const { id } = req.query;
  console.log(id);
  await Garbage.deleteOne({ _id: id });
  res.status(200).json({ message: "deleted" });
}
