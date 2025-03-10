import { $fetch, type FetchContext, type FetchOptions } from "ofetch";
import ApiError from "./api-error";
import type ApiOptions from "./api-options";
import { cloneDeep, keys } from "lodash-es";

export default class ApiClient implements ApiOptions {
  public onSuccess?: (response?: any) => any;
  public onRequest?: () => any;
  public onError?: (apiError?: ApiError) => unknown;
  public onFinally?: (result?: unknown | ApiError) => unknown;

  public headers: { [key: string]: string } = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };

  public signal: any = undefined;
  public showError = true;
  public showLoader = true;
  public dataOnly = true;
  public timeout = 120000;
  public baseURL: string = "/api";
  // public baseURL: string = useAppStore().baseURL;
  public excludeMessageAlert: (string | number)[] = [];

  private nuxtApp;

  constructor(options: ApiOptions = {}) {
    Object.assign(this, options);

    if (options.extraHeaders)
      this.headers = {
        ...this.headers,
        ...options.extraHeaders,
      };

    this.nuxtApp = useNuxtApp();
  }

  private initFetch() {
    return $fetch.create({
      signal: this.signal || undefined,
      baseURL: this.baseURL,
      onRequest: async (context: FetchContext) => {
        keys(this.headers).map((key) => {
          context.options.headers.set(key, this.headers[key] as string);
        });
        // if (
        //   context &&
        //   typeof context.request === "string" &&
        //   !context.request?.includes("refresh")
        // ) {
        // if (useAuthStore().isRefreshing) {
        //   await useAuthStore().waitForRefresh();
        // }
        // if (useAuthStore().token) {
        //   context.options.headers.set(
        //     "Authorization",
        //     `Bearer ${useAuthStore().token}`,
        //   );
        // }
        // }
        this.onRequest && this.onRequest();
        this.showLoader && useLoaderStore().show();
      },
    });
  }

  private successHandler = async (data: any) => {
    try {
      this.onSuccess && (await this.onSuccess(data));
      this.onFinally && (await this.onFinally(data));
      return data;
    } finally {
      this.showLoader && useLoaderStore().hide();
    }
  };

  private errorHandler = async (error: any) => {
    let ignoreError = false;
    let apiError;
    if (error?.response) {
      apiError = new ApiError(error);
      ignoreError = this.errorNotification(apiError);
      this.onError && (await this.onError(apiError));
      this.onFinally && (await this.onFinally(apiError));
    }

    if (!ignoreError && !this.onError) {
      if (apiError) {
        throw apiError;
      } else {
        throw error;
      }
    }
  };

  private errorNotification(apiError: ApiError) {
    const errorMessage = apiError.getMessage();
    const errorCode = apiError.getCode();

    const ignore =
      this.excludeMessageAlert.includes(errorMessage) ||
      this.excludeMessageAlert.includes(errorCode) ||
      this.excludeMessageAlert.includes("*");

    if (ignore) {
      return true;
    }

    if (errorMessage && this.showError) {
      this.nuxtApp.$toast.error(errorMessage);
    }
    return false;
  }

  private async call(url: string, options: FetchOptions) {
    options.headers = this.headers;
    const fetchInstance = this.initFetch();

    try {
      const response = await fetchInstance(url, options);
      return await this.successHandler(response);
    } catch (error: any) {
      this.showLoader && useLoaderStore().hide();
      // if (
      //   error?.status === 401 &&
      //   !error?.request?.includes("refresh") &&
      //   !error?.request?.includes("login")
      // ) {
      //   if (useAuthStore().isRefreshing) {
      //     return fetchInstance(url, options).catch(this.errorHandler);
      //   } else {
      //     return useAuthStore()
      //       .refreshTokens()
      //       .then(() => fetchInstance(url, options))
      //       .then(this.successHandler)
      //       .catch(this.errorHandler);
      //   }
      // }
      return this.errorHandler(error);
    }
  }

  private prepareBody(body: unknown): string | null | undefined {
    if (!body) {
      return undefined;
    }
    try {
      const payload = JSON.stringify(cloneDeep(body));
      return payload;
    } catch (e) {
      console.log("parse error");
      console.error(e);
    }
  }

  get(url: string, query = {}) {
    const options = {
      method: "GET",
      query,
    };
    return this.call(url, options);
  }

  post(url: string, data = {}) {
    const options = {
      method: "POST",
      body: this.prepareBody(data),
    };
    return this.call(url, options);
  }

  patch(url: string, data = {}) {
    const options = {
      method: "PATCH",
      body: this.prepareBody(data),
    };
    return this.call(url, options);
  }

  put(url: string, data = {}) {
    const options = {
      method: "PUT",
      body: this.prepareBody(data),
    };
    return this.call(url, options);
  }

  destroy(url: string) {
    const options = {
      method: "DELETE",
    };
    return this.call(url, options);
  }
}
