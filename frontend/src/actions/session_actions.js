import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveUserSignIn = (user) => ({
    type: RECEIVE_USER_SIGN_IN,
    user
});

export const receiveUserLogout = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const signup = user => dispatch => (
    APIUtil.signup(user).then(user => (
        dispatch(receiveUserSignIn(user.data))
    ))
);

export const login = user => dispatch => (
    APIUtil.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
)

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    APIUtil.setAuthToken(false)
    dispatch(receiveUserLogout())
};
