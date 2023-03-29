import { onProductDetailsPage } from "../support/pages/productDetailsPage.js"
import { onCheckoutPage } from "../support/pages/checkoutPage.js"

describe('Frontend TC', () => {
    let totalPrice = 0;
    let discountedPrice = 0;
    beforeEach(() => {
        cy.fixture('shopItems.json').as('products')
        cy.fixture('shopItems.json').its(1).as('productOne')
        cy.fixture('shopItems.json').its(2).as('productTwo')
        //assuming a fixture is present
        cy.fixture('user.json').as('user')
    })

    it('verify payment of more than 5 items', () => {
        cy.get('@products').then((product) => {
            for (var index in product) {
                cy.visit(product[index].url)
                onProductDetailsPage.get_product_name_lbl().should('be.visible')
                                    .invoke('textContent').then((text) => {
                                        expect(text).to.equal(product.name)
                                    })
                // Add 3 kits/items in cart
                for(let n = 0; n < 3; n ++) {
                    onProductDetailsPage.get_add_to_cart_btn().should('be.visible')
                    onProductDetailsPage.click_on_add_to_cart_btn()
                    totalPrice += product.price
                }
            }
        })
        cy.get('@productOne').then((product) => {
            onCheckoutPage.get_order_item_one_name_lbl().should('be.visible').invoke('textContent').then((text) => {
                expect(text).to.equal(product.name)
            })
            onCheckoutPage.get_order_item_one_quantity_lbl().should('be.visible').invoke('textContent').then((text) => {
                expect(text).to.contain(3)
            })
            onCheckoutPage.get_order_item_one_price_lbl().should('be.visible').invoke('textContent').then((text) => {
                expect(text).to.contain(product.price)
            })
        })
        cy.get('@productTwo').then((product) => {
            onCheckoutPage.get_order_item_two_quantity_lbl().should('be.visible').invoke('textContent').then((text) => {
                expect(text).to.equal(product.name)
            })
            onCheckoutPage.get_order_item_two_quantity_lbl().should('be.visible').invoke('textContent').then((text) => {
                expect(text).to.contain(3)
            })
            onCheckoutPage.get_order_item_two_price_lbl().should('be.visible').invoke('textContent').then((text) => {
                expect(text).to.contain(product.price)
            })
            discountedPrice = totalPrice - product.price
        })
        onCheckoutPage.get_grand_total_lbl().should('be.visible').invoke('textContent').then((text) => {
            expect(text).to.contain(discountedPrice)
        })
        cy.get('@user').then((user) => {
            onCheckoutPage.get_email_field().should('be.visible').type(user.email)
            onCheckoutPage.get_first_name_field().should('be.visible').type(user.firstName)
            onCheckoutPage.get_last_name_field().should('be.visible').type(user.lastName)
            onCheckoutPage.get_address_field().should('be.visible').type(user.address)
            onCheckoutPage.get_city_field().should('be.visible').type(user.city)
        })
        //Assuming steps for entering demo credit card information are present
        onCheckoutPage.elements.place_order_btn().should('be.visible').click()
        onCheckoutPage.verify_payment_complete_modal()
    })
})