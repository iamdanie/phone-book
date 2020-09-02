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

export const initialState = {
  user: null,
  userToken: null,
  contacts: [],
  totalContacts: 0,
  from: 0,
  to: null,
  pageSize: 10,
  loading: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        userToken: action.payload.token
      }
    case LOG_OUT_SUCCESS:
    case UPDATE_USER_PASSWORD_SUCCESS:
    case LOG_IN_ERROR:
      return {...state, user: null, userToken: null}
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload.contacts,
        from: action.payload.from,
        to: action.payload.to,
        totalContacts: action.payload.totalContacts
      }
    case DELETE_CONTACTS_SUCCESS:
      const contactsList = state.contacts.filter(
        contact => contact.id !== action.payload.contactId
      )
      return {
        ...state,
        contacts: contactsList,
        totalContacts: state.totalContacts - 1
      }
    case REGISTER_CONTACTS_SUCCESS:
      return {
        ...state,
        totalContacts: state.totalContacts + 1
      }
    case SET_LOADING:
      return {...state, loading: true}
    case RESET_LOADING:
      return {...state, loading: false}
    case REGISTER_USER_SUCCESS:
    default:
      return state
  }
}
