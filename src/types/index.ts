import { AnyAction } from '@reduxjs/toolkit';

export interface IModel {
  id: string;
  text: string;
  isFinished: boolean;
  createdAt?: string;
  updatedAt?: string;
  isTextShowed?: boolean;
}

export type TActionSlice = Omit<IModel, 'text'>;
export type TUpdateTextShowed = Omit<TActionSlice, 'isFinished'>;

export interface IColumnProps {
  labelText?: string;
  addHandler: (v: string) => AnyAction;
  removeHandler: (v: string) => AnyAction;
  completedHandler: (v: TActionSlice) => AnyAction;
  selectorState: IModel[];
  droppableId: string;
  updateTextShowed: (v: TUpdateTextShowed) => AnyAction;
}

export interface ITaskProps {
  id: string;
  text: string;
  isFinished: boolean;
  createdAt: string;
  updatedAt: string;
  isTextShowed: boolean;
  index: number;
  updateTextShowed: (v: TUpdateTextShowed) => AnyAction;
  removeHandler: (v: string) => AnyAction;
  completedHandler: (v: TActionSlice) => AnyAction;
}