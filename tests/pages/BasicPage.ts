import { Page } from "@playwright/test";

/**
 * Basic page class extended by all POM
 */
export default abstract class BasicPage {
  constructor(
    public readonly page: Page,
    public readonly origin: string = process.env.PLAYWRIGHT_TEST_BASE_URL ||
      "https://hotel-example-site.takeyaqa.dev/ja"
  ) {}
}
