class Greencart {
    getKeywordSearch() {
        return cy.get('.search-keyword')
    }
    getBrandLogo() {
        return cy.get('.brand')
    }
    getFirstProduct() {
        return cy.get('.product:first')
    }
    getCart() {
        return cy.get('img[src="https://rahulshettyacademy.com/seleniumPractise/images/bag.png"]')
    }
    getCartProductInfo() {
        return cy.get('.cart-items')
                .find('.cart-item')
                .find('.product-info')

    }
    getCartDetail() {
        return cy.get('.cart-preview')
    }
    getEmptyCart() {
        return cy.get('.empty-cart')
    }
    getCheckoutButton() {
        return cy.contains('PROCEED TO CHECKOUT')
    }
    getCartItems() {
        return cy.get('.cart-items')
    }
    getItemPrice() {
        return cy.get('.product-price').invoke('text')
    }
    getCartTable() {
        return cy.get('.cartTable tbody tr')
    }
    getQty() {
        return cy.get('.quantity')
    }
    getPrice() {
        return cy.get('amount')
    }
    getTotal() {
        return cy.get()
    }
}

export default Greencart