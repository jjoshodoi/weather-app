import * as actions from "../../actionTypes";

export const updateView = (view) => {
  return {
    type: actions.UPDATE_VIEW,
    payload: view,
  };
};
