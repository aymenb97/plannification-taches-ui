import { SET_PAGE_TITLE, SET_NAV_LINK } from "./actionTypes";
export const setPageTitle = (title) => {
  return {
    type: SET_PAGE_TITLE,
    pageTitle: title,
  };
};
export const setNavLink = (navTitle, navLink) => {
  return {
    type: SET_NAV_LINK,
    navTitle: navTitle,
    navLink: navLink,
  };
};
