import * as actions from "../../actionTypes";

export const updateAddress = (text) => {
  return {
    type: actions.UPDATE_ADDRESS,
    payload: text,
  };
};
