import url from 'url';
import userRoutes from './routes/users/userRoutes.mjs'; // Импортируем обработчик маршрутов

// Функция для обработки запросов
const routeHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    
    if (path === '/users' || path.startsWith('/users/')) {
        userRoutes(req, res);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({ messege: 'Route not found' }));
    }
};

export default routeHandler;