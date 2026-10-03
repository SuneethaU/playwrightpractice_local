/* ======================================================
    Playwright Locator Filters 

    1.Verify "Add to cart" for Product 2   
	2.Find items with "In stock"
    3.Count items not having "Out of stock"
	4.Verify stock status counts
	5.Verify elements using data-testid
    6.Count all elements with test ids
    7.Find "Say goodbye" button for John
    8.Find "Say hello" button for Mary
    9.Find "Subscribe" buttons using multiple conditions
    10.Find "details" buttons for done tasks
    
======================================================*/

// Hooks - Runs before each test
// Open the practice page before every test

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/filters_practice');
})

/*
test.afterEach(async ({ page }) => {
    await page.close()
})
*/

//hasText

test("1.Verify 'Add to cart' for Product 2", async({page})=>{

   const product2Button=page.getByRole('listitem').filter({hasText:'Product 2'})
        .getByRole('button',{name:'Add to cart'})

    //visibility
    await expect (product2Button).toBeVisible()
    await product2Button.click() // clicking the button

})


test("2.Find items with 'In stock'", async({page})=>{

 const inStockItems=page.getByRole('listitem').filter({hasText:'In stock'})
 await expect(inStockItems).toHaveCount(3)

console.log(await inStockItems.count())

})


//hasNotText
test("3.Count items not having 'Out of stock'", async({page})=>{

    /*
const inStockitems= page.getByRole('listitem')
                        .filter({hasText:'In stock'}) 
*/

const inStockItems=page.locator(".card").nth(1)
            .getByRole('listitem').filter({hasNotText:'Out of stock'})

await expect(inStockItems).toHaveCount(3)
console.log(await inStockItems.count())

})


test('4.Verify stock status counts', async ({ page }) => {

    const inStock = page.getByRole('listitem').filter({ hasText: 'In stock' });
    const outOfStock = page.getByRole('listitem').filter({ hasText: 'Out of stock' });

    await expect(inStock).toHaveCount(3);
    await expect(outOfStock).toHaveCount(2);
});


//  getByTestId() usage
test('5.Verify elements using data-testid', async ({ page }) => {

    // Locate elements using test id
    const apple = page.getByTestId('apple');
    const banana = page.getByTestId('banana');
    const orange = page.getByTestId('orange');

    // Verify visibility
    await expect(apple).toBeVisible();
    await expect(banana).toBeVisible();
    await expect(orange).toBeVisible();

    // Verify text content
    await expect(apple).toContainText('apple');  //🍏 apple
    await expect(banana).toContainText('banana');
    await expect(orange).toContainText('orange');
});


//  first(), last(), nth()

test(' 6.Count all elements with test ids', async ({ page }) => {

 const fruites=page.locator(".card").nth(2).getByRole('listitem')


 const firstelement=fruites.first()
 const lastelement=fruites.last()
 const nthelement=fruites.nth(2)

 console.log("*****   Printing Names Of Fruites  ************")

 console.log(await firstelement.innerText())
 console.log(await lastelement.innerText())
 console.log(await nthelement.innerText())
    
});


test(" 7.Find 'Say goodbye' button for John", async({page})=>{
   const goodbybutton=page.getByRole('listitem').filter({hasText:'John'}).getByRole("button",{name:'Say goodbye'})
   await expect(goodbybutton).toBeVisible()
   await expect(goodbybutton).toHaveText('Say goodbye')

})

test('8.Find "Say hello" button for Mary', async ({ page }) => {

    const helloButton = page.getByRole('listitem')
        .filter({ hasText: 'Mary' })
        .getByRole('button', { name: 'Say hello' });

    await expect(helloButton).toBeVisible();
    await expect(helloButton).toHaveText('Say hello');
});

//  Matching multiple locators using .and()
//Find "Subscribe" buttons using multiple conditions
// role="button" and have title "Subscribe"

    //Find buttons that are both role="button" and have title "Subscribe"


test('9.Find "Subscribe" buttons using multiple conditions', async ({ page }) => {

const subscribeButtons=page.getByRole('button').and(page.getByTitle("Subscribe",{exact:true}))
console.log("Number of subscribe buttons:", await subscribeButtons.count())

await expect(subscribeButtons).toHaveCount(2)
   
});

test('10.Find "details" buttons for done tasks', async ({ page }) => {

    const doneTaskDetails = page
        .getByRole('listitem')
        .filter({ hasText: 'done' })
        .getByRole('button', { name: 'details' });

    await expect(doneTaskDetails).toHaveCount(2);
});
