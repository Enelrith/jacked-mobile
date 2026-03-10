export interface IErrorMessage {
  timestamp: string;
  status: number;
  message: string;
  error: string;
  validationErrors: Record<string, string> | null;
}
