import type ApiError from "./api-error";

export default interface ApiOptions {
  onSuccess?: (response?: any) => any;
  onRequest?: () => any;
  onError?: (apiError?: ApiError) => unknown;
  onFinally?: (result?: unknown | ApiError) => unknown;
  extraHeaders?: { [key: string]: any };
  showError?: boolean;
  showLoader?: boolean;
  dataOnly?: boolean;
  excludeMessageAlert?: (string | number)[];
  timeout?: number;
  signal?: any;
}
