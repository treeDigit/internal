import clientPromise from "./mongoDb";

export const getAllEmployee = async () => {
  const client = await clientPromise;
  const db = client.db("employeeDashboard");

  const employees = await await db
    .collection("employee")
    .find({})
    .toArray();

    return employees;
};
