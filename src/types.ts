/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAction {
  type: string;
  payload?: any;
}

export interface IReducer<T> {
  (state: T, action: IAction): T;
}
