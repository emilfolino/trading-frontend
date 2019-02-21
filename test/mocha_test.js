/**
 * Test with Selenium for frontend Ramverk2.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

// Test suite
test.describe("Frontend Banana Trading", function() {

    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("http://localhost:3000/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function goToButtonLink(target) {
        browser.findElement(By.className(target)).then(function(element) {
            element.click();
        });
    }


    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/" + target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    function assertH4(target) {
        browser.findElement(By.css("h4")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    function assertSmall(target) {
        browser.findElement(By.css("navbar-brand")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    // Test cases
    test.it("USE-CASE #1 - Get Title", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "BANANA - Trading");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "BANANA - Trading");
        });

        done();
    });

    test.it("USE-CASE #2 - Navigate To /price", function(done) {
        // try use nav link
        goToNavLink("BANAN STOCK PRICES");
        matchUrl("price" );
        done();
    });


    test.it("USE-CASE #3 - Navigate to /user/login", function(done) {
        goToButtonLink("btn");

        // get h4 text
        assertH4("Login");
        matchUrl("user/login");

        done();
    });

    test.it("USE-CASE #4 - Go To /trade", function(done) {
        browser.get("http://localhost:3000/trade");
        assertH4("Trading platform - undefined");
        done();
    });

    test.it("USE-CASE #5 - Go To /user", function(done) {
        browser.get("http://localhost:3000/user");
        assertH4("Trader information - undefined");
        done();
    });
});
