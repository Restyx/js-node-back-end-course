// создаем объект для хранения пользователей, я решил еспользовать Map вместо массива
let users = new Map();
let currentId = 1;

// Фунции для взоимодействия с пользователями
export function getUsers() {
    return Array.from(users.values());
}

export function getUserById(id) {
    if (!users.has(id)) return null;
    return users.get(id);
}

export function createUser(data) {
    const id = currentId++;
    users.set(id, {"id": id, ...data});
    return users.get(id);
}

export function updateUser(id, updatedData) {
    if (!users.has(id)) return null;
    Object.assign(users.get(id), updatedData);
    return users.get(id);
}

export function deleteUser(id) {
    if (!users.has(id)) return null;
    users.delete(id);
    return true;
}