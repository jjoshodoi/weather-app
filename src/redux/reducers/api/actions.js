import * as actions from "../../actionTypes";

export const updateCWData = (data) => {
  return {
    type: actions.UPDATE_CW_API,
    payload: data,
  };
};

export const updateOneCallData = (data) => {
  return {
    type: actions.UPDATE_ONECALL_API,
    payload: data,
  };
};
