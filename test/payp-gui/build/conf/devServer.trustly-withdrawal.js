'use strict';

/* eslint-disable */

var path = require('path');

let afterWithdrawalReq = false;

function getPendingAccountResponse() {
    console.log('getPendingAccountResponse responseCounter: ');
    return JSON.stringify({
        "_links": {
            "self": {
                "href": "http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "trustly-withdrawal:request-status" : {
                "href" : "http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            }
        },
        "withdrawalRef": "ba473d59-970f-416e-95f8-f46c7bef5093",
        "status": "VALIDATE"
    }, null, 3);
}

function getFailedAccountResponse() {
    console.log('getFailedAccountResponse responseCounter: ');
    return JSON.stringify({
        "_links": {
            "self": {
                "href": "http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "trustly-withdrawal:request-status" : {
                "href" : "http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            }
        },
        "withdrawalRef": "ba473d59-970f-416e-95f8-f46c7bef5093",
        "status": "CANCELED",
        "reasonKey": "An error occured at Trustly"
    }, null, 3);
}

function getAccountResponse() {
    console.log('getAccountResponse responseCounter: ');
    return JSON.stringify({
        "_links": {
            "self": {
                "href": "http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            },
            "trustly-withdrawal:request-status" : {
                "href" : "http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            }
        },
        "bankAccount": "******4444",
        "bankName": "Skandia banken",
        "accountId": "1212121212",
        "withdrawalRef": "ba473d59-970f-416e-95f8-f46c7bef5093",
        "status": "VALIDATE"
    }, null, 3);
}

function getWithdrawalResponse() {
    console.log('getWithdrawalResponse responseCounter: ');
    return JSON.stringify({
        "_links": {
            "self": {
                "href": "http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093"
            }
        },
        "withdrawalRef": "ba473d59-970f-416e-95f8-f46c7bef5093",
        "status": "AWAIT_APPROVAL",
        //"status" : "FAILED",
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
    }, null, 3);
}

function getFailedWithdrawalResponse(res) {
    console.log('Error response');
    res.status(400); // Testing error scenario
    res.setHeader('Content-Type', 'text/html');
    res.send("<div>Kefla</div>");
}

const setup = (app) => {
    console.log('devServer.trustly-withdrawal.setup()');

    app.post('/trustly-withdrawal/external-api/log', function (req, res) {
        console.log('overriding ' + req.originalUrl);
        res.json({name: 'kalle'});
    });

    app.post('/trustly-withdrawal/external-api/withdrawal/withdrawal-request', function (req, res) {
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
                    'href': 'http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request'
                },
                'trustly-withdrawal:request-status': {
                    'href': 'http://localhost:8080/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093'
                },
                'curies': [{
                    'href': 'http://localhost:8080/rels/{rel}',
                    'name': 'trustly-withdrawal',
                    'templated': true
                }]
            },
            'withdrawalRef': 'ba473d59-970f-416e-95f8-f46c7bef5093'
        }, null, 3));

        afterWithdrawalReq = true;
    });

    /*
    app.get('/trustly-withdrawal/external-api/withdrawal/select-account-url/ba473d59-970f-416e-95f8-f46c7bef5093', function (req, res) {
        res.status(402);
        res.send(JSON.stringify({
            "reference" : "E-6@1493216376400",
            "messageKey" : "trustly-withdrawal.error.genericException"
        }))
    });
    */
    
    app.get('/trustly-withdrawal/external-api/withdrawal/select-account-url/ba473d59-970f-416e-95f8-f46c7bef5093', function (req, res) {
        res.status(200);
        return res.send(JSON.stringify({
            'href': 'http://localhost:8080/mock/trustly-withdrawal-iframe-mock.html'
        }, null, 3));
    });
    
    app.get('/mock/trustly-withdrawal-iframe-mock.html', function (req, res) {
        console.log('overriding' + req.originalUrl);
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname,
            '../dev-server/public/dist/mock/trustly-withdrawal-iframe-mock.html'));
    });

    app.get('/trustly-withdrawal/external-api/withdrawal/withdrawal-request/ba473d59-970f-416e-95f8-f46c7bef5093', function (req, res) {
        console.log('overriding ' + req.originalUrl);

        var response;

        res.setHeader('Content-Type', 'application/json');

        /* Error after withdrawal
        if (afterWithdrawalReq) {
            response = getFailedWithdrawalResponse(res);
        }
        */

        switch(Math.floor(Math.random() * 3) + 1) {
            case 1:
                response = getPendingAccountResponse();
                break;
            case 2:
                response = getAccountResponse();
                break;
            case 3:
                response = getWithdrawalResponse();
                break;
            default:
        }
        
        // response = getFailedAccountResponse();

        res.send(response);
    });

    // BO stuff below

    app.get('/backoffice-proxy/trustly-withdrawal/internal-api/withdrawals/withdrawal-for-customer/108030653/1995-01-01', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "requestTrackingWithdrawalRequestResources" : [ {
                "_links" : {
                    "self" : {
                        "href" : "http://localhost:8080/backoffice-proxy/trustly-withdrawal/internal-api/withdrawals/withdrawal-details/ead54efe-1b2f-4aed-8883-9829f8df27b7"
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
                "requestType" : "trustly_WITHDRAWAL.WITHDRAWAL"
            } ],
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/trustly-withdrawal/internal-api/withdrawals/withdrawal-for-customer/108030653/1995-01-01"
                }
            }
        }, null, 3));
    });

    app.get('/backoffice-proxy/trustly-withdrawal/internal-api/withdrawals/withdrawal-for-customer/108030699/1995-01-01', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/trustly-withdrawal/internal-api/withdrawals/withdrawal-for-customer/108030699/1995-01-01"
                }
            }
        }, null, 3));
    });

    app.get('/backoffice-proxy/trustly-withdrawal/internal-api/withdrawals/withdrawal-details/ead54efe-1b2f-4aed-8883-9829f8df27b7', function(req, res) {
        console.log('overriding ' + req.originalUrl);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "_links" : {
                "self" : {
                    "href" : "http://localhost:8080/backoffice-proxy/trustly/internal-api/withdrawals/withdrawal-details/ead54efe-1b2f-4aed-8883-9829f8df27b7"
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
            "bankName" : "Danske Bank"
        }, null, 3));
    });

    app.get('/backoffice-proxy/trustly-withdrawal/internal-api/withdrawals/withdrawal-details/ead54efe-1b2f-4aed-8883-9829f8df27xx', function(req, res) {
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
