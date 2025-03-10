import { get } from "lodash-es";

export default class ApiError extends Error {
  private error: any;
  constructor(error: any) {
    super(error);
    this.error = error;
  }

  getCode() {
    return get(this.error, "response.status", null);
  }

  getMessage() {
    return (
      get(this.error, ["response", "statusText"]) ||
      get(this.error, ["message"], "")
    );
  }

  toJSON() {
    return this.error;
  }
}
