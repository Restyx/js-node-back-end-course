import { createUser } from "../../db-data.mjs";

export default async (req, res) => {
  let body = "";

  req.on("data", (buffer) => {
    body += buffer.toString();
  });

  req.on("end", async () => {
    const parsedBody = JSON.parse(body);
    const name = parsedBody.name;
    const age = parsedBody.age;

    if (name && age) {
      const user = { name, age: parseInt(age) };
      await createUser(user);
      res.writeHead(200);
      res.end();
    } else {
      res.writeHead(400);
      res.end({ message: "Name and Age are required" });
    }
  });
};
