import {combineReducers} from 'redux'

const getGeneralInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_GENERAL_LOGIN_INFO':
      state = {...state, ...action.payload}
      return state;
    default:
      return state;
  }
}

const getAdminInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_ADMIN_LOGIN_INFO':
      state = {...state, ...action.payload};
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  user: getGeneralInfo,
  admin: getAdminInfo
});