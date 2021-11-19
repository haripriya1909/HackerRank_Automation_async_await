const puppeteer = require("puppeteer");
const loginLink = 'https://www.hackerrank.com/auth/login';
const codeObj= require('./code')
let email = "xoyidip373@incoware.com";
let pass = "pepcoding";
let cTab
(async function () {
    try {
        const browserInstance = await puppeteer.launch(
            {
                headless: false,
                args: ['--start-maximized'],
                defaultViewport: null
            }
        );

        let newTab = await browserInstance.pages();
        cTab = newTab[0];
        await cTab.goto(loginLink);
        await cTab.type("input[type='text']" , email , {dealy : 50});
        await cTab.type("input[type='password']" , pass , {dealy : 50});
        await cTab.click("button[data-analytics='LoginPassword']" , {dealy : 50});
        await waitandclick("a[data-attr1='algorithms']" , cTab);
        await waitandclick('input[value="warmup"]', cTab)
        let allChallenges = await cTab.$$('div.challenge-submit-btn', { delay: 50 });
        console.log("No of Questions - ", allChallenges.length)
        await questionsolver(cTab, allChallenges[0], codeObj.answers[0]);

    } catch (error) {
        console.log(error);
    }
})();

async function waitandclick(selector , cPage)
{
   await cPage.waitForSelector(selector);
   let selectorClicked =await cPage.click(selector);
   return selectorClicked;
} 




async function questionsolver(page, question, answer) {
    await question.click()
    await waitandclick(".monaco-editor.no-user-select.vs", page) //editor clicked
    await waitandclick('input[type="checkbox"]', page);
    await waitandclick('textarea.custominput', page)
    await page.type('textarea.custominput', answer, { delay: 5 })
    await page.keyboard.down('Control')
    await page.keyboard.press('A', { delay: 50 })
    await page.keyboard.press('X', { delay: 50 })
    await page.keyboard.up('Control')
    await waitandclick(".monaco-editor.no-user-select.vs", page)
    await page.keyboard.down('Control')
    await page.keyboard.press('A',{delay:50})
    await page.keyboard.press('V',{delay:50})
    await page.keyboard.up('Control')
    await waitandclick(".hr-monaco__run-code",page,{delay:20})
}

