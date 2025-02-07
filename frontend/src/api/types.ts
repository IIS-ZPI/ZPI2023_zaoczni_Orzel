export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  errorMsg?: string;
};
