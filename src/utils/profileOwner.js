export const getOwner = (allUsers, userName) => {
    const user = allUsers.filter((user) => {
        return user.userName === userName
    })
    return user[0]
}