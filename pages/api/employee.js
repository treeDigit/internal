// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongoDb";
import { getServerSession } from "next-auth/next";
import authConfig from "./auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await getServerSession(req,res,authConfig);
  if (!session) {
    res.status(401).json({ message: "unAuthorised" });
    return;
  }
  if (req.method === "POST") {
    const values = req.body
    const employeeRecord = {
            employee_id: Number(values.empoyee_id),
            first_name: values.first_name,
            last_name: values.last_name,
            "DOB": {
              "$date": values.dob
            },
            age:Number(values.age),
            overall_it_experinece:values.it_exp,
            "manager": Number(values.reporting_manager),
            "designation": values.emp_Role,
            "location": values.location,
            "email": values.org_email,
            "personal_email": values.personal_email,
            "mobile":values.mobile,
            "leaves": {
              "total_paid_leaves_available": 20,
              "total_unpaid_leaves": 0
            },
            "password": "$2a$12$FUFK0/ioOr3EtGy.FREJX.rC1oVoRXh0oD4kSt/h4GRcv1n9WKwZO"
    };

    try {
      const client = await clientPromise;
      const db = client.db("employeeDashboard");
      await db.collection("employee").insertOne(employeeRecord);
      res.status(201).json({ message: "Create success" });
    } catch (e) {
      console.log("Error while updating", e);
      res.status(500).json({ error: "Error while updating DB" });
    }
  }
}
