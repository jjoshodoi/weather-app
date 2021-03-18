import * as actions from "../../actionTypes";

// These are what get run in the dispatches

export const increment = (number) => {
  return { type: actions.INCREMENT, payload: number };
};

export const toggle = () => {
  return {
    type: actions.TOGGLE,
  };
};
