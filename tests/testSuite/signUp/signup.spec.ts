import { SignUpPage, SignUpInfo } from "../../pages/SignupPage";
import data from "./data.json";
import { test, expect } from "@playwright/test";

test.describe("Sign Up", () => {
  test.only("sign up", async ({ page }) => {
    const d = data.newUser;

    // visit SignUpPage
    const signUpPage = new SignUpPage(page);
    await signUpPage.visit();

    // //Sign up and see if it navigates to myPage
    // const myPage = await signUpPage.signUp(testData);
    // await expect(page.url()).toContain(myPage.url);

    // //Check if registered info is displayed except for those 'nonDisplayKeys'
    // const nonDisplayKeys = new Set([
    //   "password",
    //   "rank",
    //   "gender",
    //   "dateOfBirth",
    // ]);
    // await myPage.assertRegisteredInfoVisible(testData, nonDisplayKeys);
  });
});
