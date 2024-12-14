import { Page } from "@playwright/test";

/**
 * Basic page class extended by all POM
 */
export default abstract class BasicPage {
  constructor(public readonly page: Page) {}
}
