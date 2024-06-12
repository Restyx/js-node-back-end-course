import url from 'url';

// Импортируем методы для запросов
import listUsers from './listUsers.mjs';
import createUser from "./createUser.mjs";
import getUser from "./getUser.mjs";
import updateUser from "./updateUser.mjs";
import deleteUser from "./deleteUser.mjs";

// Сама функция для обработки запросов
async function userRoutes(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;
    
    res.setHeader('Content-Type', 'application/json');

    if (path === '/users' && method === 'GET') {
        await listUsers(req, res);
    } else if (path === '/users' && method === 'POST') {
        await createUser(req, res);
    } else if (path.startsWith('/users/') && method === 'GET') {
        await getUser(req, res);
    } else if (path.startsWith('/users/') && method === 'PUT') {
        await updateUser(req, res);
    } else if (path.startsWith('/users/') && method === 'DELETE') {
        await deleteUser(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ messege: 'Route not found in users' }));
    }
};

export default userRoutes;