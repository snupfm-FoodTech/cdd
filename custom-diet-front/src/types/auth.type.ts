interface IError extends Error {
  errors: string[];
  statusCode: number;
  timeStamp: string;
  hasErrors: boolean;
  content?: string;
}
