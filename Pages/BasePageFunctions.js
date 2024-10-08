const puppeteer = require('puppeteer');
const { LoginPageElements, MainPageElements, CartPageElements, CheckoutPageElements } = require("../WebElements/webElements");
const { commandsTimeout, browserConfigurations } = require("../config");
const Logger = require("../Logger/Logger");

class BasePageFunctions {
    logger;
    constructor() {
        this.browser = null;
        this.page = null;
        this.recorder = null;
        this.logger = new Logger();
    }

    async launchBrowser() {
        try {
            this.browser = await puppeteer.launch(browserConfigurations)
            this.page = await this.browser.newPage();
            this.logger.info("Browser launched successfully");
        }
        catch (er) {
            this.logger.error(er);
        }
    }

    async getPage() {
        try {
            return this.page
        }
        catch (er) {
            this.logger.error(er);
        }
    }

    async quit() {
        try {
            await this.browser.close();
            this.logger.info("Browser Closed");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async openUrl(url) {
        try {
            await this.page.goto(url, { waitUntil: 'networkidle0' });
            this.logger.info("Open url");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async setFullscreen() {
        try {
            this.page.setViewport({
                width: 1530,
                height: 900,
            });
            this.logger.info("Fullscreen size set");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }

    }

    async login(username, password) {
        try {
            await this.page.type(LoginPageElements.UsernameField, username);
            await this.page.type(LoginPageElements.PasswordField, password);
            await this.page.click(LoginPageElements.LoginBtn);
            this.logger.info("Login action");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async addBackpackToCart() {
        try {
            await this.page.keyboard.press('Enter');
            await this.page.waitForSelector(MainPageElements.BackpackAddToCardBtn, { timeout: commandsTimeout });
            await this.page.click(MainPageElements.BackpackAddToCardBtn);
            this.logger.info("Click on Add to Cart button for Backpack Item");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }

    }

    async removeBackpackFromCart() {
        try {
            await this.page.waitForSelector(MainPageElements.BackpackRemoveBtn, { timeout: commandsTimeout });
            await this.page.click(MainPageElements.BackpackRemoveBtn);
            this.logger.info("Click on Remove button for Backpack Item");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async addBikeLightToCart() {
        try {
            await this.page.waitForSelector(MainPageElements.BikeLightAddToCardBtn, { timeout: commandsTimeout });
            await this.page.click(MainPageElements.BikeLightAddToCardBtn);
            this.logger.info("Click on Add to Cart button for Bike Light Item");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }

    }

    async removeBikeLightFromCart() {
        try {
            await this.page.waitForSelector(MainPageElements.BikeLightRemoveBtn, { timeout: commandsTimeout });
            await this.page.click(MainPageElements.BikeLightRemoveBtn);
            this.logger.info("Click on Remove button for Bike Light Item");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async clickCart() {
        try {
            await this.page.waitForSelector(MainPageElements.CartBtn, { timeout: commandsTimeout });
            await this.page.click(MainPageElements.CartBtn);
            this.logger.info("Click on Cart button");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async clickCheckout() {
        try {
            await this.page.waitForSelector(CartPageElements.CheckoutBtn, { timeout: commandsTimeout });
            await this.page.click(CartPageElements.CheckoutBtn);
            this.logger.info("Click on Checkout button");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async clickContinueInCheckout() {
        try {
            await this.page.waitForSelector(CheckoutPageElements.ContinueBtn, { timeout: commandsTimeout });
            await this.page.click(CheckoutPageElements.ContinueBtn);
            this.logger.info("Click on Continue button in Checkout");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async getErrorInCheckout() {
        try {
            await this.page.waitForSelector(CheckoutPageElements.ErrorMessage, { timeout: commandsTimeout });
            this.logger.info("Get the error");
            return await this.page.$eval(CheckoutPageElements.ErrorMessage, el => el.textContent);
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async fillCheckoutInformation(firstname, lastname, postalCode) {
        try {
            await this.page.waitForSelector(CheckoutPageElements.FirstnameField, { timeout: commandsTimeout });
            await this.page.type(CheckoutPageElements.FirstnameField, firstname);
            await this.page.type(CheckoutPageElements.LastnameField, lastname);
            await this.page.type(CheckoutPageElements.ZipcodeField, postalCode);
            this.logger.info("Fills the Order Information Form");
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async getBackpackProductTitle() {
        try {
            await this.page.waitForSelector(CheckoutPageElements.BackpackProductTitle, { timeout: commandsTimeout });
            this.logger.info("Get backpack product title");
            return await this.page.$eval(CheckoutPageElements.BackpackProductTitle, el => el.textContent);
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async getBackpackProductPrice() {
        try {
            await this.page.waitForSelector(CheckoutPageElements.BackpackProductPrice, { timeout: commandsTimeout });
            this.logger.info("Get backpack product price");
            return await this.page.$eval(CheckoutPageElements.BackpackProductPrice, el => el.textContent);
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async getBikeLightProductTitle() {
        try {
            await this.page.waitForSelector(CheckoutPageElements.BikeLightProductTitle, { timeout: commandsTimeout });
            this.logger.info("Get bike light product title");
            return await this.page.$eval(CheckoutPageElements.BikeLightProductTitle, el => el.textContent);
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async getBikeLightProductPrice() {
        try {
            await this.page.waitForSelector(CheckoutPageElements.BikeLightProductPrice, { timeout: commandsTimeout });
            this.logger.info("Get bike light product price");
            return await this.page.$eval(CheckoutPageElements.BikeLightProductPrice, el => el.textContent);
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async getItemsTotal() {
        try {
            this.logger.info("Get items total price");
            await this.page.waitForSelector(CheckoutPageElements.PriceTotal, { timeout: commandsTimeout });
            const fullText = await this.page.$eval(CheckoutPageElements.PriceTotal, el => el.textContent);
            const match = fullText.match(/\$[0-9,.]+/);
            return match ? match[0] : null;
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async getItemsTax() {
        try {
            this.logger.info("Get tax price");
            await this.page.waitForSelector(CheckoutPageElements.TaxPrice, { timeout: commandsTimeout });
            const fullText = await this.page.$eval(CheckoutPageElements.TaxPrice, el => el.textContent);
            const match = fullText.match(/\$[0-9,.]+/);
            return match ? match[0] : null;
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }

    async getItemsTotalPriceIncludeTax() {
        try {
            this.logger.info("Get items total price includes tax");
            await this.page.waitForSelector(CheckoutPageElements.TotalPriceIncludesTax, { timeout: commandsTimeout });
            const fullText = await this.page.$eval(CheckoutPageElements.TotalPriceIncludesTax, el => el.textContent);
            const match = fullText.match(/\$[0-9,.]+/);
            return match ? match[0] : null;
        }
        catch (er) {
            this.logger.error(er);
            throw new Error(er);
        }
    }
}

module.exports = BasePageFunctions;
