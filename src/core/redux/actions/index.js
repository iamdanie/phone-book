import {store} from 'core/redux/store'
import {
  SET_LOADING,
  RESET_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT_SUCCESS,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_PASSWORD_SUCCESS,
  REGISTER_CONTACTS_SUCCESS,
  GET_CONTACTS_SUCCESS,
  DELETE_CONTACTS_SUCCESS
} from '../actionTypes'
import fetchApi from 'core/api'

const setLoader = () => ({
  type: SET_LOADING
})

const resetLoader = () => ({
  type: RESET_LOADING
})

const logInSuccess = data => ({
  type: LOG_IN_SUCCESS,
  payload: data
})

const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS
})

const registerContactSuccess = contact => ({
  type: REGISTER_CONTACTS_SUCCESS,
  payload: {contact}
})

const updatePasswordSuccess = () => ({
  type: UPDATE_USER_PASSWORD_SUCCESS
})

const deleteContactSuccess = contactId => ({
  type: DELETE_CONTACTS_SUCCESS,
  payload: {contactId}
})

const logInError = error => ({
  type: LOG_IN_ERROR,
  payload: {error}
})

const logOutUser = () => ({
  type: LOG_OUT_SUCCESS
})

const getContactsSucess = (data, from, to) => ({
  type: GET_CONTACTS_SUCCESS,
  payload: {contacts: data.items, totalContacts: data.totalItems, from, to}
})

export const authenticateUser = payload => async dispatch => {
  dispatch(setLoader())
  try {
    const response = await fetchApi('POST', '/user/authenticate', payload)
    dispatch(logInSuccess(response.data))
  } catch (error) {
    dispatch(logInError(error))
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const logoutCurrentUser = () => async dispatch => {
  dispatch(logOutUser())
}

export const registerUser = payload => async dispatch => {
  dispatch(setLoader())
  try {
    await fetchApi('POST', '/user', payload)
    dispatch(registerUserSuccess())
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const updateUserPassword = payload => async dispatch => {
  dispatch(setLoader())
  try {
    const userId = store.getState().user.id
    await fetchApi('PUT', `/user/password/${userId}`, payload)

    dispatch(updatePasswordSuccess())
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const registerContact = payload => async dispatch => {
  dispatch(setLoader())
  try {
    const response = await fetchApi('POST', '/contact', payload)

    dispatch(registerContactSuccess(response.data))
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const deleteContact = contactId => async dispatch => {
  dispatch(setLoader())
  try {
    await fetchApi('DELETE', `/contact/delete/${contactId}`)

    dispatch(deleteContactSuccess(contactId))
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}

export const getContacts = (from = 0, to = null) => async dispatch => {
  dispatch(setLoader())
  try {
    const response = await fetchApi('GET', `/contacts?from=${from}&to=${to}`)

    dispatch(getContactsSucess(response.data, from, to))
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}
