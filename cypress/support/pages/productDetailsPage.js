export class productDetailsPage {

    // Locators
    elements = {
        add_to_cart_btn:() => cy.getQa('addToCartButton').eq(1),
        proceed_to_checkout_btn:() => cy.getQa('checkout-link'),
        product_name_lbl:() => cy.getQa('heroProductName')
    }

    // Get Functions
    get_add_to_cart_btn() {
        return this.elements.add_to_cart_btn()
    }

    get_proceed_to_checkout_btn() {
        return this.elements.proceed_to_checkout_btn()
    }

    get_product_name_lbl() {
        return this.elements.product_name_lbl()
    }

    // Set Functions
    click_on_add_to_cart_btn() {
        this.elements.add_to_cart_btn().click();
    }

    click_on_proceed_to_checkout_btn() {
        this.elements.proceed_to_checkout_btn().click()
    }
}

export const onProductDetailsPage = new productDetailsPage() 
