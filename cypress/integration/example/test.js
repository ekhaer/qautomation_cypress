import Greencart from "../pageObjects/greencart"
import Helper from "../pageObjects/helper"
const { expect } = require("chai")
//GREENKART
describe('My First Test Suite', function () {
    before(function(){
        //run once before other test cases
        cy.fixture('greenproducts').then(function(data){
            this.data = data
        })
    })
    it('My first Test', function () {
        const greencart = new Greencart()
        const helper = new Helper()
        const url = Cypress.env('greenkartURL')
        cy.visit(url)
        //brand
        greencart.getBrandLogo().should('have.text', 'GREENKART')
        greencart.getCartDetail().should('not.have.class', 'active')

        //before any product is clicked
        greencart.getCart().click()
        greencart.getCartDetail().should('have.class', 'active')
        greencart.getEmptyCart().should('be.visible')
        greencart.getCheckoutButton().should('have.class', 'disabled')

        //searching for products 'ap'
        this.data.productNameSearch.forEach(product => {
            greencart.getKeywordSearch().type(product)
            console.log("PRODUCT>>>", product)
            // cy.selectProduct(product)
        });
        // greencart.getKeywordSearch().type('ap')

        cy.wait(100)
        //check how many div.products, should be 3
        cy.get('.product:visible').should('have.length', 3)

        // check within first product as sample
        cy.get('.container').then(($container) => {
            let productPrice = ''
            let productName = ''
            cy.wrap($container).get('.product:first').within(() => {
                //check: the default qty in the textbox of a product is 1
                cy.get('.quantity').should('have.value', '1')
                cy.get('h4.product-name').invoke('text').then((pname) => {
                    productName = pname
                    cy.log(pname)
                })
                cy.get('p.product-price').invoke('text').then((pprice) => {
                    productPrice = parseFloat(pprice.trim())
                    cy.log(pprice)
                    cy.log(productPrice)
                })
                //check: to click reduce while the qty is 1, the qty should be still 1
                cy.get('.decrement').click().get('.quantity').should('have.value', '1')
                //check: the increment works fine +1
                let addOne = 11
                for (let i = 0; i < addOne; i++) {
                    cy.get('.increment').click()
                }
                cy.get('.quantity').should('have.value', '12')

                //check: the text box cannot be fill with other than numbers
                cy.get('.quantity').clear().type('e')
                cy.get('.quantity').should('have.value', '');

                //check: qty can be type manually
                cy.get('.quantity').clear().type('11')
                cy.get('.quantity').should('have.value', '11');

                //ADD TO CART
                cy.get('button').click()
                cy.get('button').should('have.class', 'added')

            })
            cy.wrap(null).then(() => {
                greencart.getCart().as('cart')
                cy.get('@cart').should('be.visible')
                cy.get('@cart').click()
                greencart.getCartDetail().should('have.class', 'active')
                //getCartItems
                greencart.getCartProductInfo()
                    .find('p.product-price')
                    .invoke('text').then((text) => {
                        cy.log('Raw Price Text:', text.trim());
                        const productCartPrice = helper.getNumber(text)

                        // Check if productPrice equals expected price
                        expect(productCartPrice, 'Product price matches').to.eq(productPrice);
                        // Check the qty of the product
                    });
                greencart.getCartProductInfo()
                    .find('p.product-name')
                    .invoke('text').then((text) => {
                        const prodName = helper.getWord(text)
                        expect(prodName).to.eq(productName)
                    })
                //checkout page
                greencart.getCheckoutButton().click()
                cy.url().should('eq', url + 'cart')
                greencart.getCartTable().each(($row, index, $rows) => {
                    cy.wrap($row).find('td').last().should('contain', '660');
                });
            })
        })
    })

})