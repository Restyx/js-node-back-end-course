import { createServer } from 'node:http';
import routerHandler from './router.mjs'; // Ипортируем обработчик маршрутов

// Создаем HTTP сервер
const server = createServer(routerHandler);

// запускаем сервер на порту 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on prot ${PORT}`);
});
