import { SET_PAGE_TITLE } from "../actionTypes";
const initialState = {
  pageTitle: null,
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_TITLE: {
      return {
        ...state,
        pageTitle: action.pageTitle,
      };
    }
    default:
      return state;
  }
};
export default postReducer;
