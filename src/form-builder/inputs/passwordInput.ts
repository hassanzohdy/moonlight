import { PasswordInputBuilder } from "../components";

export function passwordInput(name: string) {
  return new PasswordInputBuilder(name);
}
