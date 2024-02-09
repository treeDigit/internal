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
    const { claimData, employeeId, employeeName, employeeManager } = req.body;
    const claimRecord = {
      name: employeeName,
      employee_id: employeeId,
      currently_with: employeeManager,
      isApproved_manager: false,
      isApproved_hr: false,
      isRejected: false,
      description: claimData.description,
      type: claimData.claim_type,
      amount: claimData.amount,
      date: claimData.date,
      doc_link: claimData.doc_link,
      isActive:true
    };

    try {
      const client = await clientPromise;
      const db = client.db("employeeDashboard");
      await db.collection("claim_request").insertOne(claimRecord);
      res.status(201).json({ message: "Create success" });
    } catch (e) {
      console.log("Error while updating", e);
      res.status(500).json({ error: "Error while updating DB" });
    }
  } else if (req.method === "PUT") {
    const { isApproved, claimData } = req.body;
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
        } else {
          data = {
            isApproved_manager: true,
            currently_with: 1,
          };
        }
       const up =  await db
          .collection("claim_request")
          .updateOne({ _id: new ObjectId(claimData._id) }, {$set:data});
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
      .collection("claim_request")
      .updateOne({ _id: new ObjectId(claimData._id) },{$set: data});
    res.status(201).json({ message: "Update success" });
    }
  }
}


