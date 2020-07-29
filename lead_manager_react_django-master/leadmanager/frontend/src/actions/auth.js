import axios from 'axios';
import { returnErrors } from './messages';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (, getState) => {
  // User Loading
  ({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      ({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      (returnErrors(err.response.data, err.response.status));
      ({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (username, password) => () => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      ({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      (returnErrors(err.response.data, err.response.status));
      ({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => () => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post('/api/auth/register', body, config)
    .then((res) => {
      ({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      (returnErrors(err.response.data, err.response.status));
      ({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (, getState) => {
  axios
    .post('/api/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      ({ type: 'CLEAR_LEADS' });
      ({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      (returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
