'use strict';

/* eslint-disable */

const setup = (app) => {
    console.log('devServer.entercash-withdrawal.setup()');

    app.post('/entercash-withdrawal/external-api/log', function (req, res) {
        console.log('overriding ' + req.originalUrl);
        res.json({name: 'kalle'});
    });

    app.post('/entercash-withdrawal/external-api/withdrawal/withdrawal-request', function (req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        /*
         res.status(400); // Testing error scenario
         res.json({
         reference: 'kalle',
         messageKey: 'entercash-withdrawal.error.aboveMaxWithdrawalLimit'
         });
         */

        res.send(JSON.stringify({
            '_links': {
                'self': {
                    'href': 'http://localhost:8080/entercash-withdrawal/external-api/withdrawal/withdrawal-request'
                },
                'entercash-withdrawal:request-status': {
                    'href': 'http://localhost:8080/entercash-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093'
                },
                'curies': [{
                    'href': 'http://localhost:8080/rels/{rel}',
                    'name': 'entercash-withdrawal',
                    'templated': true
                }]
            },
            'withdrawalRef': 'ba473d59-970f-416e-95f8-f46c7bef5093'
        }, null, 3));
    });

    app.get('/entercash-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093', function (req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links": {
                "self": {
                    "href": "http://localhost:8080/entercash-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
                }
            },
            "withdrawalRef": "ba473d59-970f-416e-95f8-f46c7bef5093",
            "status": "AWAIT_APPROVAL",
            // "status" : "FAILED",
            // "reasonKey": "entercash-withdrawal.error.statusPollFailed.text",
            "receipt": {
                "withdrawalRef": "ba473d59-970f-416e-95f8-f46c7bef5093",
                "transactionId": "1091512321",
                "amount": {
                    "amount": 322.00,
                    "currencyCode": "SEK"
                },
                "total": {
                    "amount": 322.00,
                    "currencyCode": "SEK"
                },
                "fee": {
                    "amount": 0.00,
                    "currencyCode": "SEK"
                },
                "dateOfPayment": "2016-12-29T13:20:52"
            }
        }, null, 3));
    });
    /*
     app.get('/entercash-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093', function(req, res) {
     console.log('overriding ' + req.originalUrl);
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify({
     "_links" : {
     "self" : {
     "href" : "https://payment-si1.unibet.com/entercash-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
     },
     "entercash-withdrawal:request-status" : {
     "href" : "https://payment-si1.unibet.com/entercash-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
     },
     "curies" : [ {
     "href" : "http://payment.unibet.com/rels/{rel}",
     "name" : "entercash-withdrawal",
     "templated" : true
     } ]
     },
     "withdrawalRef" : "ba473d59-970f-416e-95f8-f46c7bef5093",
     "status" : "FAILED",
     "reasonKey" : "entercash-withdrawal.error.genericException"
     }, null, 3));
     });
     */
    
    // BO stuff below

    app.get('/backoffice-proxy/entercash-withdrawal/internal-api/withdrawals/withdrawal-for-customer/108030653/1995-01-01', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "requestTrackingWithdrawalRequestResources" : [ {
                "_links" : {
                    "self" : {
                        "href" : "http://localhost:8080/backoffice-proxy/entercash-withdrawal/internal-api/withdrawals/withdrawal-details/ead54efe-1b2f-4aed-8883-9829f8df27b7"
                    }
                },
                "withdrawalRef" : "3703ba45-9b4d-4dad-bd54-8f46c6db35b7",
                "transactionId" : "1091356275",
                "status" : "FAILED_STATE",
                "amount" : {
                    "amount" : 900.00,
                    "currencyCode" : "SEK"
                },
                "providerAmount" : {
                    "amount" : 900.00,
                    "currencyCode" : "SEK"
                },
                "created" : "2016-10-12T12:13:29Z",
                "message" : "Withdrawal has been cancelled by customer",
                "site" : "unibet-mobile-drawer",
                "requestType" : "entercash_WITHDRAWAL.WITHDRAWAL"
            } ],
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/entercash-withdrawal/internal-api/withdrawals/withdrawal-for-customer/108030653/1995-01-01"
                }
            }
        }, null, 3));
    });

    app.get('/backoffice-proxy/entercash-withdrawal/internal-api/withdrawals/withdrawal-for-customer/108030699/1995-01-01', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/entercash-withdrawal/internal-api/withdrawals/withdrawal-for-customer/108030699/1995-01-01"
                }
            }
        }, null, 3));
    });

    app.get('/backoffice-proxy/entercash-withdrawal/internal-api/withdrawals/withdrawal-details/ead54efe-1b2f-4aed-8883-9829f8df27b7', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/entercash/internal-api/withdrawals/withdrawal-details/ead54efe-1b2f-4aed-8883-9829f8df27b7"
                }
            },
            "withdrawalRef" : "ead54efe-1b2f-4aed-8883-9829f8df27b7",
            "transactionId" : "1091601738",
            "status" : "WITHDRAWAL_SUCCESSFUL_STATE",
            "amount" : {
                "amount" : 873.00,
                "currencyCode" : "SEK"
            },
            "fee" : {
                "amount" : 27.00,
                "currencyCode" : "SEK"
            },
            "created" : "2017-02-10T13:31:42Z",
            "site" : "unibet-mobile-drawer",
            "bankAccountNumber" : "**********048486",
            "bankClearingOrBic" : "Danske Bank",
            "bankAccountName" : "Kalle kula"
        }, null, 3));
    });

    app.get('/backoffice-proxy/entercash-withdrawal/internal-api/withdrawals/withdrawal-details/ead54efe-1b2f-4aed-8883-9829f8df27xx', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(() => {});
    });
};

const setupExternalMocks = function () {

};

module.exports = {
    setup,
    setupExternalMocks
};
