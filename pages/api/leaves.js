// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongoDb";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth/[...nextauth]"
import {ObjectId} from "mongodb"

export default async function handler(req, res) {
  const session = await getServerSession(req,res,authConfig);
  if (!session) {
    res.status(401).json({ message: "unAuthorised" });
    return;
  }
  if (req.method === "POST") {
    const { leaveData, employeeId, employeeName, employeeManager } = req.body;
    let type = "leaves.total_paid_leaves_available";
    let value = leaveData.total_days * -1;
    if (leaveData.type !== "paid") {
      type = "leaves.total_unpaid_leaves";
      value = leaveData.total_days;
    }
    const leaveRecord = {
      name: employeeName,
      employee_id: employeeId,
      currently_with: employeeManager,
      isApproved_manager: false,
      isApproved_hr: false,
      isRejected: false,
      description: leaveData.description,
      type: leaveData.type,
      to_date: leaveData.to_date,
      from_date: leaveData.from_date,
      total_days: leaveData.total_days,
      isActive:true
    };

    try {
      const client = await clientPromise;
      const db = client.db("employeeDashboard");
      // const up = await db.collection("employee").updateOne(
      //   { employee_id: employeeId },
      //   {
      //     $push: { "leaves.applied_leaves": leaveData },
      //     $inc: { [`${type}`]: value },
      //   }
      // );
      await db.collection("leave_request").insertOne(leaveRecord);
      res.status(201).json({ message: "Update success" });
    } catch (e) {
      console.log("Error while updating", e);
      res.status(500).json({ error: "Error while updating DB" });
    }
  } else if (req.method === "PUT") {
    const { isApproved, leaveData } = req.body;
    if (isApproved) {
      try {
        const client = await clientPromise;
        const db = client.db("employeeDashboard");
        let data;
        if (session.user.email === "HR@treedigit.com") {
          data = {
            isApproved_manager: true,
            isApproved_hr: true,
            isActive: false,
          };
          let type = "leaves.total_paid_leaves_available";
          let value = leaveData.total_days * -1;
          if (leaveData.type !== "paid") {
            type = "leaves.total_unpaid_leaves";
            value = leaveData.total_days;
          }
          const up = await db.collection("employee").updateOne(
            { employee_id: leaveData.employee_id },
            {
              $inc: { [`${type}`]: value },
            }
          );
        } else {
          data = {
            isApproved_manager: true,
            currently_with: 1,
          };
        }
       const up =  await db
          .collection("leave_request")
          .updateOne({ _id: new ObjectId(leaveData._id) }, {$set:data});
        res.status(201).json({ message: "Update success" });
      } catch (e) {
        console.log("Error while updating", e);
        res.status(500).json({ error: "Error while updating DB" });
      }
    }else{
      const client = await clientPromise;
      const db = client.db("employeeDashboard");
      let data = {
        isApproved_manager: false,
        isApproved_hr: false,
        isActive: false,
        isRejected:true
      };
      await db
      .collection("leave_request")
      .updateOne({ _id: new ObjectId(leaveData._id) },{$set: data});
    res.status(201).json({ message: "Update success" });
    }
  }
}
