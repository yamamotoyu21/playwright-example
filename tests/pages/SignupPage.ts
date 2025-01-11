import { Page } from "@playwright/test";
import BacicPage from "./BacicPage";

export interface SignUpInfo {
  email: string;
  password: string;
  confirmPW: string;
  name: string;
  rank?: "premium" | "normal";
  address?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
}

export class SignUpPage extends BacicPage {
  private readonly selectors = {
    email: "#email",
    password: "#password",
    passwordConfirm: "#password-confirmation",
    username: "#username",
    rankPremium: "#rank-premium",
    rankNormal: "#rank-normal",
    address: "#address",
    phone: "#tel",
    gender: "#gender",
    birthday: "#birthday",
    notification: "#notification",
    submitButton: 'button[type="submit"]',
  } as const;

  async visit(): Promise<void> {
    await this.page.goto(`${this.origin}/signup.html`);
  }
}
