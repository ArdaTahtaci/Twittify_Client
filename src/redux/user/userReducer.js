import * as types from "./userTypes.js"

const initialState = {
    allUsers: [],
    loginAttempt: undefined,
    session: {
        isLoggedIn: false,
        currentUser: {
            userInfo: undefined,
            accessToken: undefined
        }
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_USERS: return {
            ...state,
            allUsers: action.payload
        }
        case types.CREATE_USER: return {
            ...state,
            allUsers: [...state.allUsers, action.payload]
        }
        case types.LOGIN: return {
            ...state,
            session: {
                isLoggedIn: true,
                currentUser: {
                    userInfo: action.payload.user,
                    accessToken: action.payload.accessToken
                }
            }
        }
        case types.LOGIN_FAILURE: return {
            ...state,
            loginAttempt: true
        }
        case types.LOGOUT_U: return initialState

        case types.ADD_NEW_TWEET: return {
            ...state,
            session: {
                isLoggedIn: true,
                currentUser: {
                    userInfo: action.payload.thisUser,
                    accessToken: state.session.currentUser.accessToken
                }
            }
        }
        case types.ADD_RETWEET: return {
            ...state,
            allUsers: action.payload
        }
        case types.ADD_QUOTE_TO_USER: return {
            ...state,
            allUsers: action.payload
        }
        case types.FOLLOW: return {
            allUsers: action.payload.allUsers,
            loginAttempt: undefined,
            session: {
                isLoggedIn: true,
                currentUser: {
                    userInfo: action.payload.currentUser,
                    accessToken: state.session.currentUser.accessToken
                }
            }
        }
        case types.UNFOLLOW: return {
            allUsers: action.payload.allUsers,
            loginAttempt: undefined,
            session: {
                isLoggedIn: true,
                currentUser: {
                    userInfo: action.payload.currentUser,
                    accessToken: state.session.currentUser.accessToken
                }
            }
        }
        case types.EDIT: return {
            allUsers: action.payload.allUsers,
            loginAttempt: undefined,
            session: {
                isLoggedIn: true,
                currentUser: {
                    userInfo: action.payload.currentUser,
                    accessToken: state.session.currentUser.accessToken
                }
            }
        }
        default: return state
    }
}

export default userReducer
