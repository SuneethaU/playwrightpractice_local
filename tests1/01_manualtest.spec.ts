//fixture - global variable  : page


import { test, expect } from "@playwright/test";

test("Verify page title", async({page})=>{
   await page.goto("https://demowebshop.tricentis.com/")
   await expect(page).toHaveTitle("Demo Web Shop") // assertion/validation
})