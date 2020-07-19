export enum ActionType {
  EDIT,
  CREATE,
  DELETE,
  ADD_CARD,
  ADD_ACCOUNT
}

export interface IAction {
  type: ActionType;

  /** MDI Icon {@see https://material.io/resources/icons} */
  icon: string;

  data?: any;

  title?: string;
}
