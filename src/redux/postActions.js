import { SET_PAGE_TITLE } from "./actionTypes";
export const setPageTitle = (title) => {
  return {
    type: SET_PAGE_TITLE,
    pageTitle: title,
  };
};
