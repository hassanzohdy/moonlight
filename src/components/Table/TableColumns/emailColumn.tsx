import { EmailFormatter } from "../Formatters/EmailFormatter";
import { tableColumn } from "./tableColumn";

export function emailColumn(key = "email", heading = key) {
  return tableColumn(key, heading).formatter(EmailFormatter);
}
