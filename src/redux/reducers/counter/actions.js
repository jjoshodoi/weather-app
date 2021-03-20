import * as actions from "../../actionTypes";

export const increment = (number) => {
  return { type: actions.INCREMENT, payload: number };
};
