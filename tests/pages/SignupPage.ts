import { Locator, Page, expect, BrowserContext } from "@playwright/test";
import { MyPage } from "./MyPage";
import BasicPage from "./BasicPage";

export interface SignUpInfo {
  email: string;
  password: string;
  confirmPW: string;
  name: string;
  rank?: string;
  address?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
}

export class SignUpPage extends BasicPage {
  readonly url: string;

  private readonly elements = {
    inputs: {
      email: "#email",
      password: "#password",
      passwordConfirm: "#password-confirmation",
      username: "#username",
      address: "#address",
      phone: "#tel",
      birthday: "#birthday",
    },
    rank: {
      premium: "#rank-premium",
      normal: "#rank-normal",
    },
    gender: "#gender",
    notification: "#notification",
    submit: 'button[type="submit"]',
  } as const;

  constructor(page: Page, origin: string) {
    super(page, origin);
    this.url = `${this.origin}/signup.html`;
  }

  /**
   * Visit signup page
   */
  async visit(): Promise<void> {
    await this.page.goto(this.url);
  }

  /**
   * Fill text input field
   */
  private async fillInput(selector: string, value?: string): Promise<void> {
    if (value) {
      await this.page.type(selector, value);
    }
  }

  /**
   * Select user rank
   */
  private async selectRank(rank?: string): Promise<void> {
    if (!rank) return;

    const rankSelector =
      rank === "premium"
        ? this.elements.rank.premium
        : this.elements.rank.normal;

    await this.page.locator(rankSelector).check();
  }

  /**
   * Fill form with signup information
   */
  private async fillForm(info: SignUpInfo): Promise<void> {
    const { email, password, name, rank, address, phone, gender, dateOfBirth } =
      info;

    // Required fields
    await this.fillInput(this.elements.inputs.email, email);
    await this.fillInput(this.elements.inputs.password, password);
    await this.fillInput(this.elements.inputs.passwordConfirm, password);
    await this.fillInput(this.elements.inputs.username, name);

    // Optional fields
    await this.selectRank(rank);
    await this.fillInput(this.elements.inputs.address, address);
    await this.fillInput(this.elements.inputs.phone, phone);

    if (gender) {
      await this.page
        .locator(this.elements.gender)
        .selectOption(gender.toString());
    }

    if (dateOfBirth) {
      await this.page.fill(this.elements.inputs.birthday, dateOfBirth);
    }

    await this.page.locator(this.elements.notification).check();
  }

  /**
   * Complete signup process and return MyPage instance
   */
  async signUp(signUpInfo: SignUpInfo): Promise<MyPage> {
    await this.fillForm(signUpInfo);
    await this.page.locator(this.elements.submit).click();
  }
}
