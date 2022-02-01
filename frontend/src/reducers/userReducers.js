import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,


  USER_LOGOUT,
} from "constants/userConstants";




export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ul_loading: true };

    case USER_LOGIN_SUCCESS:
      return { ul_loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { ul_loading: false, ul_error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ur_loading: true };

    case USER_REGISTER_SUCCESS:
      return { ur_loading: false, userCreated: true };

    case USER_REGISTER_FAIL:
      return { ur_loading: false, ur_error: action.payload, userCreated: false };
    
      case USER_LOGOUT:
        return {};
  

    default:
      return state;
  }
};

// export const userUpdateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_UPDATE_REQUEST:
//       return { uu_loading: true };

//     case USER_UPDATE_SUCCESS:
//       return { uu_loading: false, userUpdated: action.payload };

//     case USER_UPDATE_FAIL:
//       return { uu_loading: false, uu_error: action.payload, userUpdated:false};
    
//       case USER_LOGOUT:
//         return {};
  

//     default:
//       return state;
//   }
// };

// export const userDeleteReducer = (state = {}, action) => {
//   switch (action.type) {
//     case USER_DELETE_REQUEST:
//       return { ud_loading: true };

//     case USER_DELETE_SUCCESS:
//       return { ud_loading: false, userDeleted: true };

//     case USER_DELETE_FAIL:
//       return {
//         ud_loading: false,
//         ud_error: action.payload,
//         userDeleted: false,
//       };

//       case USER_LOGOUT:
//         return {};
  

//     default:
//       return state;
//   }
// };
