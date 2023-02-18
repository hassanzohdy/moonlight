import { toastError } from "../components/Toast";
import { parseError } from "./parse-error";

/**
 * Use this function to handle error coming from try/catch block especially with Api calls
 */
export function catchError(error: any) {
  return toastError(parseError(error));
}
