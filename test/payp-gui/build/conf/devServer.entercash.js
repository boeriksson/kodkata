'use strict';

var express = require('express');
var path = require('path');
var responseCounter = 0;

function getPendingEcResponse() {
    return JSON.stringify({
        '_links': {
            'self': {
                'href':'http://localhost:8080/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093'
            },
            'entercash:request-status': {
                'href': 'http://localhost:8080/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093'
            },
            'curies': [{
                'href': 'http://localhost:8080/rels/{rel}',
                'name': 'entercash',
                'templated': true
            }]
        },
        'depositRef': 'ba473d59-970f-416e-95f8-f46c7bef5093',
        'status': 'PENDING_EC',
        // 'url': 'http://cs8.dev.unibet.com:9270/external-provider/rest/entercash/pannel/uniqueId-ba473d59-970f-416e-95f8-f46c7bef5093/entercash-bank-login-page.html',
        'url': 'http://localhost:8080/mock/entercash-deposit-external-mock.html',
        'type': 'WINDOW'
    }, null, 3);
}

function getPendingEcResponseRealEcTestEnv() {
    return JSON.stringify({
        "_links": {
            "self": {
                "href": "https://payment-qa1.unibet.com/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "entercash:request-status": {
                "href": "https://payment-qa1.unibet.com/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "curies": [{
                "href": "http://payment.unibet.com/rels/{rel}",
                "name": "entercash",
                "templated": true
            }]
        },
        "depositRef": "ba473d59-970f-416e-95f8-f46c7bef5093",
        "status": "PENDING_EC",
        "url": "https://ui.test.ecdirect.net/ui/deposit/E/SE/F437300825/payment.html",
        "type": "WINDOW"
    }, null, 3);
}

function getCancelEcResponse() {
    return JSON.stringify({
        "_links" : {
            "self" : {
                "href" : "https://payment-qa1.unibet.com/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "entercash:request-status" : {
                "href" : "https://payment-qa1.unibet.com/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "curies" : [ {
                "href" : "http://payment.unibet.com/rels/{rel}",
                "name" : "entercash",
                "templated" : true
            } ]
        },
        "depositRef" : "ba473d59-970f-416e-95f8-f46c7bef5093",
        "status" : "FAILED_FRONTEND_PENDING_EC",
        "reasonKey" : "entercash.error.depositCancelled"
    }, null, 3);
}

function getFailedResponse() {
    return JSON.stringify({
        "_links" : {
            "self" : {
                "href" : "https://payment-qa1.unibet.eu/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "entercash:request-status" : {
                "href" : "https://payment-qa1.unibet.eu/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "curies" : [ {
                "href" : "http://payment.unibet.com/rels/{rel}",
                "name" : "entercash",
                "templated" : true
            } ]
        },
        "depositRef" : "ba473d59-970f-416e-95f8-f46c7bef5093",
        "status" : "FAILED_FRONTEND_PENDING_EC",
        "reasonKey" : "entercash.error.depositCancelled"
    }, null, 3);
}

function getReceiptResponse() {
    return JSON.stringify({
        '_links': {
            'self': {
                'href': 'http://localhost:8080/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093'
            }
        },
        'depositRef': 'ba473d59-970f-416e-95f8-f46c7bef5093',
        'status': 'DEPOSIT_SUCCESSFUL',
        'receipt': {
            'depositRef': 'ba473d59-970f-416e-95f8-f46c7bef5093',
            'transactionId': '1091539725',
            'amount': {
                'amount': 300.00,
                'currencyCode': 'SEK'
            },
            'total': {
                'amount': 309.00,
                'currencyCode': 'SEK'
            },
            'fee': {
                'amount': 9.00,
                'currencyCode': 'SEK'
            },
            'dateOfPayment': '2017-01-12T09:52:38',
            'depositCount': 21
        }
    }, null, 3);
}

const setup = (app) => {
    app.post('/entercash/external-api/log', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.json({ name: 'dummyJson' });
    });
    app.post('/entercash/external-api/deposit/deposit-request', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            '_links': {
                'self': {
                    'href': 'http://localhost:8080/entercash/external-api/deposit/deposit-request'
                },
                'entercash:request-status': {
                    'href': 'http://localhost:8080/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093'
                },
                'curies': [{
                    'href': 'http://dn/rels/{rel}',
                    'name': 'entercash',
                    'templated': true
                }]
            },
            'depositRef': 'ba473d59-970f-416e-95f8-f46c7bef5093'
        }, null, 3));
    });

    app.get('/entercash/external-api/deposit/deposit-request/ba473d59-970f-416e-95f8-f46c7bef5093', function(req, res) {
        var response;
        console.log('overriding' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');

        if (responseCounter < 2) {
            responseCounter++;
            response = getPendingEcResponse();
            // response = getPendingEcResponseRealEcTestEnv();
        } else {
            responseCounter = 0;
            response = getReceiptResponse();
            // response = getCancelEcResponse();
            // response = getFailedResponse();
        }
        res.send(response);
    });

    app.get('/entercash/external-callback/prepare-redirect/ba473d59-970f-416e-95f8-f46c7bef5093', function(req, res) {
        console.log('overriding' + req.originalUrl);
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname,
            '../dev-server/public/entercash/external-callback/prepare-redirect/index.html'));
        // res.send('Keff');
    });
    
    app.get('/mock/entercash-deposit-external-mock.html', function (req, res) {
        console.log('overriding' + req.originalUrl);
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname,
            '../dev-server/public/dist/mock/entercash-deposit-external-mock.html'));
    });

    /*
    app.use('/entercash/external-callback',
        express.static(path.join(__dirname,
            '../../dev-server/public/entercash/external-callback')));
            */

    // BO stuff below

    app.get('/backoffice-proxy/entercash/internal-api/deposits/deposit-for-customer/108030653/1995-01-01', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "requestTrackingDepositRequestResources" : [ {
                "_links" : {
                    "self" : {
                        "href" : "http://localhost:8080/backoffice-proxy/entercash/internal-api/deposits/deposit-details/ead54efe-1b2f-4aed-8883-9829f8df27b7"
                    }
                },
                "depositRef" : "3703ba45-9b4d-4dad-bd54-8f46c6db35b7",
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
                "message" : "Deposit has been cancelled by customer",
                "site" : "unibet-mobile-drawer",
                "requestType" : "entercash.DEPOSIT"
            } ],
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/entercash/internal-api/deposits/deposits-for-customer/108030653/1995-01-01"
                }
            }
        }, null, 3));
    });

    app.get('/backoffice-proxy/entercash/internal-api/deposits/deposit-details/ead54efe-1b2f-4aed-8883-9829f8df27b7', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/entercash/internal-api/deposits/deposit-details/ead54efe-1b2f-4aed-8883-9829f8df27b7"
                }
            },
            "depositRef" : "ead54efe-1b2f-4aed-8883-9829f8df27b7",
            "transactionId" : "1091601738",
            "status" : "DEPOSIT_SUCCESSFUL_STATE",
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
            "bankAccountNumber" : "4021722587",
            "bankAccountName" : "Barbara Törnquist",
            "bankAccountNationalId" : "SE196405203727",
            "bankName" : "Swedbank",
            "bankClearingOrBic" : "SWEDEN"
        }, null, 3));
    });

    app.get('/backoffice-proxy/entercash/internal-api/deposits/deposit-details/ead54efe-1b2f-4aed-8883-9829f8df27xx', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(() => {});
    });

    app.post('/paymentmethods/external-api/accept-notification', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links" : {
                "paymentmethods:customer-profile" : {
                    "href" : "http://localhost:8080/paymentmethods/external-api/customer-profile"
                },
                "curies" : [ {
                    "href" : "http://payment.unibet.com/rels/{rel}",
                    "name" : "paymentmethods",
                    "templated" : true
                } ]
            }
        }, null, 3));
    });
};

const setupExternalMocks = function() {
    /*
    var express = require('express');
    var path = require('path');
    var mockApp = express();

    mockApp.listen(8081, function() {
        console.log('MockApp listening on port 8081');
    });
    */
};

module.exports = {
    setup,
    setupExternalMocks
};

