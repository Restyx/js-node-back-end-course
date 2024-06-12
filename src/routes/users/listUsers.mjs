import { getUsers } from '../../db-data.mjs';

export default async (req, res) => {
    const users = await getUsers();

    res.writeHead(200);
    res.end(JSON.stringify(users));
}