export class checkoutPage {

    // Locators
    elements = {
        add_to_cart_btn:() => cy.getQa('addToCartButton').eq(1),
        proceed_to_checkout_btn:() => cy.getQa('checkout-link'),
        order_item_one_name_lbl:() => cy.getQa('line-item-name').eq(0),
        order_item_one_quantity_lbl:() => cy.getQa('line-item-quantity').eq(0),
        order_item_one_price_lbl:() => cy.getQa('line-item-total').eq(0),
        order_item_two_name_lbl:() => cy.getQa('line-item-name').eq(1),
        order_item_two_quantity_lbl:() => cy.getQa('line-item-quantity').eq(1),
        order_item_two_price_lbl:() => cy.getQa('line-item-total').eq(1),
        grand_total_lbl:() => cy.getQa('grand-total'),
        place_order_btn:() => cy.getQa('place-order-button')
    }

    // Get Functions
    get_add_to_cart_btn() {
        return this.elements.add_to_cart_btn()
    }

    get_proceed_to_checkout_btn() {
        return this.elements.proceed_to_checkout_btn()
    }

    get_order_item_one_name_lbl() {
        return this.elements.order_item_one_name_lbl()
    }

    get_order_item_one_quantity_lbl() {
        return this.elements.order_item_one_quantity_lbl()
    }

    get_order_item_one_price_lbl() {
        return this.elements.order_item_one_price_lbl()
    }

    get_order_item_two_name_lbl() {
        return this.elements.order_item_two_name_lbl()
    }

    get_order_item_two_quantity_lbl() {
        return this.elements.order_item_two_quantity_lbl()
    }

    get_order_item_two_price_lbl() {
        return this.elements.order_item_two_price_lbl()
    }

    get_grand_total_lbl() {
        return this.elements.grand_total_lbl()
    }

    // Set Functions
    click_on_add_to_cart_btn() {
        this.elements.add_to_cart_btn().click();
    }

    click_on_proceed_to_checkout_btn() {
        this.elements.proceed_to_checkout_btn().click()
    }

    //Test Functions
    verify_payment_complete_modal () {
        // test function
    }
}

export const onCheckoutPage = new checkoutPage() 
