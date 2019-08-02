
const paypal = require('paypal-rest-sdk')


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXk3_hzEV6oQGcvgIpdR-IjJIB2CaiAF1ID3eGBqt4G9Y8RZTHTNcDyJHpe7j8XmYkmz4wiciM1laSz9',
    'client_secret': 'EHChxQ5n2Geq6lgkDglDrTEChwBWkGumkfhOG6SW9PpK6AHSgKWhPs-r_dKH-Ul1rTGc6q2U2NCyZkeN'
});



module.exports.postPaypal = function (req, res) {


    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });


}


module.exports.succesPaypal = function (req, res) {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });


}