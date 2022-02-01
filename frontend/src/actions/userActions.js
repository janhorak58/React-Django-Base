import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.setItem("userInfo", null);
};


export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register/",
      { email: email, password: password, name: name },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: true,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// export const deleteUser = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_DELETE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post("/api/users/delete/", { id: id }, config);

//     dispatch({
//       type: USER_DELETE_SUCCESS,
//       payload: data,
//     });
//     if (userInfo.id == id) {
//       localStorage.setItem("userInfo", null);
//       dispatch({
//         type: USER_LOGOUT,
//       });
//     }

//     dispatch({
//       type: USER_LIST_SUCCESS,
//       payload: data,
//     });


//   } catch (error) {
//     dispatch({
//       type: USER_DELETE_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const updateUser =
//   (id, name, email, password = "", isAdmin = null, coursesEnrolled = {}) =>
//   async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: USER_UPDATE_REQUEST,
//       });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.post(
//         "/api/users/update/",
//         {
//           id: id,
//           email: email,
//           password: password,
//           name: name,
//           isAdmin: isAdmin,
//           coursesEnrolled: coursesEnrolled,
//         },
//         config
//       );

//       dispatch({
//         type: USER_UPDATE_SUCCESS,
//         payload: data.id,
//       });

//       if (userInfo.id == id) {
//         localStorage.setItem("userInfo", JSON.stringify(data));
//         dispatch({
//           type: USER_LOGIN_SUCCESS,
//           payload: data,
//         });
//       }

//       dispatch({
//         type: USER_DETAILS_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: USER_UPDATE_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };
