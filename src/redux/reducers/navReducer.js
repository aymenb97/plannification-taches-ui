import { SET_PAGE_TITLE, SET_NAV_LINK } from "../actionTypes";
const initialState = {
  pageTitle: null,
  navLink: null,
  navTitle: null,
};
const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_TITLE: {
      return {
        ...state,
        pageTitle: action.pageTitle,
      };
    }
    case SET_NAV_LINK: {
      return {
        ...state,
        navLink: action.navLink,
        navTitle: action.navTitle,
      };
    }
    default:
      return state;
  }
};
export default navReducer;
