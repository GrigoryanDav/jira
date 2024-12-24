export const getUserById = (userId, users) => {
    return users.find(user => user.uid === userId)
}