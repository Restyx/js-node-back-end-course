import { getUserById } from '../../db-data.mjs';

export default async (req, res) => {
    const id = parseInt(req.url.split('/')[2])
    const user = await getUserById(id);
    
    if (user) {
        res.writeHead(200);
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));    
    }
}