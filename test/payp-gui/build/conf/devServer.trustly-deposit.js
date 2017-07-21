'use strict';

var express = require('express');
var path = require('path');
var responseCounter = 0;

function getPendingTrustlyResponse() {
    return JSON.stringify({
        '_links': {
            'self': {
                'href':'http://localhost:8080/trustly-deposit/external-api/deposit/deposit-request/f5f0ae6b-49f4-4c31-a369-0ad3cda9d485'
            },
            'trustly-deposit:request-status': {
                'href': 'http://localhost:8080/trustly-deposit/external-api/deposit/deposit-request/f5f0ae6b-49f4-4c31-a369-0ad3cda9d485'
            },
            'curies': [{
                'href': 'http://localhost:8080/rels/{rel}',
                'name': 'trustly-deposit',
                'templated': true
            }]
        },
        'depositRef': 'f5f0ae6b-49f4-4c31-a369-0ad3cda9d485',
        'status': 'PENDING_PROVIDER',
        // 'url': 'http://cs9.si1.unibet.com:9270/external-provider/rest/trustly/panel/1091539725/trustly-bank-login-page.html',
        'url': 'http://localhost:8080/mock/trustly-deposit-iframe-mock.html',
        'type': 'WINDOW'
    }, null, 3);
}

function getReceiptResponse() {
    return JSON.stringify({
        '_links': {
            'self': {
                'href': 'http://localhost:8080/trustly-deposit/external-api/deposit/deposit-request/f5f0ae6b-49f4-4c31-a369-0ad3cda9d485'
            }
        },
        'depositRef': 'f5f0ae6b-49f4-4c31-a369-0ad3cda9d485',
        'status': 'DEPOSIT_SUCCESSFUL',
        'receipt': {
            'depositRef': 'f5f0ae6b-49f4-4c31-a369-0ad3cda9d485',
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

function getCancelResponse() {
    return JSON.stringify({
        '_links': {
            'self': {
                'href':'http://localhost:8080/trustly-deposit/external-api/deposit/deposit-request/f5f0ae6b-49f4-4c31-a369-0ad3cda9d485'
            }
        },
        'depositRef': 'f5f0ae6b-49f4-4c31-a369-0ad3cda9d485',
        'status': 'FAILED',
        'reasonKey': 'User cancelled the deposit'
    }, null, 3);
}

const setup = (app) => {
    app.post('/trustly-deposit/external-api/log', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.json({ name: 'dummyJson' });
    });
    app.post('/trustly-deposit/external-api/deposit/deposit-request', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            '_links': {
                'self': {
                    'href': 'http://localhost:8080/trustly-deposit/external-api/deposit/deposit-request'
                },
                'trustly-deposit:request-status': {
                    'href': 'http://localhost:8080/trustly-deposit/external-api/deposit/deposit-request/f5f0ae6b-49f4-4c31-a369-0ad3cda9d485'
                },
                'curies': [{
                    'href': 'http://dn/rels/{rel}',
                    'name': 'trustly-deposit',
                    'templated': true
                }]
            },
            'depositRef': 'ba473d59-970f-416e-95f8-f46c7bef5093'
        }, null, 3));
    });

    app.get('/trustly-deposit/external-api/deposit/deposit-request/f5f0ae6b-49f4-4c31-a369-0ad3cda9d485', function (req, res) {
        var response;
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');

        if (responseCounter < 1) {
            responseCounter++;
            response = getPendingTrustlyResponse();
        } else {
            responseCounter = 0;
            // response = getCancelResponse();
            response = getReceiptResponse();
        }
        res.send(response);
    });

    app.get('/trustly-deposit/external-callback/prepare-redirect/f5f0ae6b-49f4-4c31-a369-0ad3cda9d485', function(req, res) {
        console.log('overriding' + req.originalUrl);
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname,
            '../dev-server/public/trustly-deposit/external-callback/prepare-redirect/index.html'));
    });
    
    app.get('/mock/trustly-deposit-iframe-mock.html', function (req, res) {
        console.log('overriding' + req.originalUrl);
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname,
            '../dev-server/public/dist/mock/trustly-deposit-iframe-mock.html'));
    });

    // BO stuff below

    app.get('/backoffice-proxy/trustly-deposit/internal-api/deposits/deposit-for-customer/108030653/1995-01-01', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "requestTrackingDepositRequestResources" : [ {
                "_links" : {
                    "self" : {
                        "href" : "http://localhost:8080/backoffice-proxy/trustly-deposit/internal-api/deposits/deposit-details/ead54efe-1b2f-4aed-8883-9829f8df27b7"
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
                    "href" : "http://localhost:8080/backoffice-proxy/trustly-deposit/internal-api/deposits/deposits-for-customer/108030653/1995-01-01"
                }
            }
        }, null, 3));
    });

    app.get('/backoffice-proxy/trustly-deposit/internal-api/deposits/deposit-for-customer/108030699/1995-01-01', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/trustly-deposit/internal-api/deposits/deposit-for-customer/108030699/1995-01-01"
                }
            }
        }, null, 3));
    });

    app.get('/backoffice-proxy/trustly-deposit/internal-api/deposits/deposit-details/ead54efe-1b2f-4aed-8883-9829f8df27b7', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/trustly-deposit/internal-api/deposits/deposit-details/ead54efe-1b2f-4aed-8883-9829f8df27b7"
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
            "bankClearingOrBic" : "SWEDEN",
            "customerAddress": "Testgatan 17, 98765 Testköping"
        }, null, 3));
    });

    app.get('/backoffice-proxy/trustly-deposit/internal-api/deposits/deposit-details/ead54efe-1b2f-4aed-8883-9829f8df27xx', function(req, res) {
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

