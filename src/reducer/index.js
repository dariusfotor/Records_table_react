import { actionType } from "../actions";

const initialState = {
  comments: [],
  loading: false,
  error: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionType.FETCH_SUCCES:
      return {
        ...state,
        loading: false,
        comments: action.payload
      };
    case actionType.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        comments: []
      };

    default:
      return state;
  }
};
