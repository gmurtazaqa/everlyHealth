describe('Backend API TC', () => {
    it('verify shopping cart API returns correct subtotal', () => {
        cy.request({
            method: 'GET',
            url: '/v9/shoppingCart',
            headers: {
                Accept: `application/json`,
                'Content-Type': `application/json`,
                Authorization: `Bearer eyJ0eXAAAAA1234567890`
            },
        }).then(({response}) => {
            expect(response.status, 'ShoppingCartAPI returns success').to.eq(200)
            const items = response.body.items;
            let totalPrice = 0;
            let totalQuantity = 0;
            let highestItemPrice = 0;
            let volumeDiscountTotalPrice = 0;
            let promoDiscountPrice = 0;
            items.forEach((item) => {
                totalPrice += item.quantity * item.price;
                totalQuantity += item.quantity;
            })
            if (totalQuantity >= 5) {
                items.forEach((item) => {
                    if (item.price > highestItemPrice) {
                        highestItemPrice = item.price;
                    }
                })
                volumeDiscountTotalPrice = totalPrice - highestItemPrice;
            }
            promoDiscountPrice = totalPrice - (totalPrice * (response.body.discount / 100))
            if (promoDiscountPrice < volumeDiscountTotalPrice) {
                expect(response.body.subTotal, 'Subtotal is equal to expected total').to.eq(promoDiscountPrice)
            }
            else {
                expect(response.body.subTotal, 'Subtotal is equal to expected total').to.eq(volumeDiscountTotalPrice)   
            }
        })
    })

    it('verify promocode API returns 400 when 100% discount is applied & shopping cart API is working as expected', () => {
        cy.request({
            method: 'GET',
            url: '/v9/promoCode',
            headers: {
                Accept: `application/json`,
                'Content-Type': `application/json`,
                Authorization: `Bearer eyJ0eXAAAAA1234567890`
            },
            body: {
                "discount": 100.00
            }
        }).its('status').should('be.oneOf', [400, 401, 403, 404])
        .then((statusCode) => {
            // Check if the status code is one of the received codes
            if ([400, 401, 403, 404].includes(statusCode)) {
                cy.request({
                    method: 'GET',
                    url: '/v9/shoppingCart',
                    headers: {
                        Accept: `application/json`,
                        'Content-Type': `application/json`,
                        Authorization: `Bearer eyJ0eXAAAAA1234567890`
                    },
                }).then(({response}) => {
                    expect(response.status, 'ShoppingCartAPI returns success').to.eq(200)
                    expect(response.body).to.have.property('items').that.is.an('array')
                    expect(response.body).to.have.property('discount', 0.00)
                })
            }
        })
    })
})