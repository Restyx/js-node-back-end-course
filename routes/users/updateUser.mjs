import { updateUser } from "../../db-data.mjs";

export default (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  let body = "";

  req.on("data", (buffer) => {
    body += buffer.toString();
  });

  req.on("end", async () => {
    const parsedBody = JSON.parse(body);
    const updatedData = {};

    for (const [key, value] of Object.entries(parsedBody)) {
      switch (key) {
        case "id":
          continue;

        case "age":
          updatedData[key] = parseInt(value);
          break;

        case "name":
          updatedData[key] = value;
          break;
      }
    }

    const result = await updateUser(id, updatedData);
    if (result) {
      res.writeHead(200);
      res.end(JSON.stringify({ message: "update successful" }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "User not found" }));
    }
  });
};
