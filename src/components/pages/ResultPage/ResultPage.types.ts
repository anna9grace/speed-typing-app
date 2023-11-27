export interface IResultData {
  start: number | null;
  end: number | null;
  correctSymbols: number;
  mistakes: number;
}

export interface IResult {
  speed: number;
  precision: number;
}
