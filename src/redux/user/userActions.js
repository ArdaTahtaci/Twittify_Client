import * as types from "./userTypes.js"
import * as typesT from "../tweet/typesTweets.js"
import * as api from "../../api/index.js"
import { checkData } from "../../utils/checkData.js"
import { logoutT } from "../tweet/actionsTweets.js"

export const getAllUsers = () => async (dispatch) => {

    try {
        const { data } = await api.getAllUsers()
        dispatch({
            type: types.GET_ALL_USERS,
            payload: data
        })

    } catch (error) {
        console.log(error.message)
    }



}

export const createUser = (user) => async (dispatch) => {

    try {
        const { data } = await api.createUser(user)

        console.log("this is from action creator " + data)

        dispatch({
            type: types.CREATE_USER,
            payload: data
        })

    } catch (error) {
        console.log(error.message + "from action creator ERROR")
    }

}

export const login = (data) => {

    return {
        type: types.LOGIN,
        payload: data
    }
}

export const loginFailure = () => {
    return {
        type: types.LOGIN_FAILURE
    }
}

export const logoutU = () => {
    return {
        type: types.LOGOUT_U
    }
}

export const follow = (currentUser, profileOwner) => async (dispatch) => {
    try {
        const { data } = await api.follow(currentUser, profileOwner)
        dispatch({
            type: types.FOLLOW,
            payload: {
                allUsers: data.allUsers,
                currentUser: data.currentUser
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const unfollow = (currentUser, profileOwner) => async (dispatch) => {
    try {
        const { data } = await api.unfollow(currentUser, profileOwner)
        dispatch({
            type: types.UNFOLLOW,
            payload: {
                allUsers: data.allUsers,
                currentUser: data.currentUser
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const editUser = (currentUser, dataToChange) => async (dispatch) => {

    const checkedData = checkData(dataToChange)


    try {
        const { data } = await api.edit(currentUser, checkedData)
        dispatch({
            type: types.EDIT,
            payload: {
                allUsers: data.allUsers,
                currentUser: data.currentUser
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteAcc = (user) => async (dispatch) => {

    try {
        await api.deleteAccount(user)
        dispatch(logoutU())
        dispatch(logoutT())
    } catch (error) {
        console.log(error.message)
    }
}