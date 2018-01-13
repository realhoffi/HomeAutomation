export interface IError {
  stacktrace: string;
  message: string;
}
export interface ILoadingState {
  isLoading: boolean;
  isError: boolean;
  error: IError;
}
