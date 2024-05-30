import { deleteUser } from '../../db-data.mjs';

export default async (req, res) => {
    const id = parseInt(req.url.split('/')[2]);
    const success = await deleteUser(id)

    if (success) {
        res.writeHead(200);
        res.end();    
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));    
    }
};