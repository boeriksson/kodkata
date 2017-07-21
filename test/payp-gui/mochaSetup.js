require('ignore-styles');

const sinon = require('sinon');
const chai = require('chai');

chai.use(require('dirty-chai'));
chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());

const jsdom = require('jsdom');

const document = jsdom.jsdom();
const window = document.defaultView;
const parent = window;

const config = {
    module: "entercash-withdrawal",
    archetype: "withdrawal"
};

const mock = require('mock-require');

mock('./app/components/deposit/MODULE/BankElements.jsx', () => {
});

mock('context', {
    "channel": "web",
    "clientId": "unibet.com",
    "customerId": 105100686,
    "firstName": "User",
    "lastName": "Resu",
    "isoCountryCode": "SE",
    "qualifiedUsername": "rs_dev_51@unibet",
    "username": "rs_dev_51",
    "brand": "unibet",
    "jurisdiction": "MT",
    "view": "startDeposit",
    "referrerTrackId": "",
    "locale": "sv_SE",
    "paymentCashierUrl": "",
    "paymentMethodsUrl": "/paymentmethods/external-api/",
    "baseUrl": null,
    "ctx": null,
    "parentDomain": "http://localhost:8080",
    "debug": true,
    "iovationURL": "http://snare.url",
    "methodKey": "providerxxx",
    "themeName": "unibet"
});

mock('config', {
    "module": "entercash-withdrawal",
    "archetype": "withdrawal"
});

const translations = {
    "paycashierclient": {
        "authentication": {
            "failed": {
                "message": "Antingen har din session gått ut eller så har du blivit utloggad. Vänligen försök logga in igen eller kontaka oss om problemet kvarstår.",
                "title": "Oops!"
            }
        },
        "bin_not_found": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
        "block": {
            "deposit": "You're currently blocked from making a deposit. For more information, please contact us.",
            "withdraw": "Oops!"
        },
        "blocked": "You're currently blocked from making a deposit. For more information, please contact us.",
        "blockedUser": {
            "deposit": {
                "message": "Det är inte tillåtet för dig att göra en insättning för tillfället. Vänligen kontakta oss för mer information.",
                "title": "Oops!"
            },
            "login": {
                "message": "Det är inte tillåtet för dig att logga in för tillfället. Vänligen kontakta oss för mer information.",
                "title": "Oops!"
            },
            "withdraw": {
                "message": "Det är inte tillåtet för dig att göra ett uttag för tillfället. Vänligen kontakta oss för mer information.",
                "title": "Oops!"
            },
            "withdrawal": {
                "message": "Du är för tillfället blockerad från att göra uttag. Vänligen kontakta oss för mer information\n",
                "title": "Oops!\n"
            }
        },
        "cannot_create_card": "Något gick fel när vi försökte lägga till det här kortet. Vänligen kontakta oss så hjälper vi dig.",
        "card": {
            "unsupportedCardType": "Tyvärr accepterar vi inte den här typen av kort. Vänligen prova med ett annat kort eller insättningsmetod."
        },
        "card_failed_card_deposit_failed": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
        "card_failed_deposit_amountsmall": "That amount doesn't meet the minimum deposit. Please try again with a larger amount.",
        "card_failed_deposit_card_expired": "Invalid expiry date.",
        "card_failed_entropay_general_error_message": "You may need to top-up your EntroPay Virtual VISA card.",
        "card_failed_payment": {
            "card": {
                "error": {
                    "carddepositfailed": {
                        "sa": {
                            "3dsnotallowed": "We are unable to proceed with this transaction as this card has 3D secure (Verified by VISA or MasterCard SecureCode) activated from the issuer. The customer can only make a deposit with this card via the site as the transaction requires the customer to enter his personal 3Ds code which we are not allowed to ask for."
                        }
                    },
                    "depositlimitfailed": "Du måste vänta lite längre innan du gör en ny insättning. Vänligen försök igen om några minuter."
                },
                "provider": {
                    "reject": {
                        "insufficientfund": "Du har inte tillräckligt mycket pengar för att fortsätta med denna transaktion. Vänligen kontakta din bank."
                    }
                }
            },
            "iovation": {
                "transaction": {
                    "denied": "Sorry, the transaction cannot be completed! Please contact Customer Support."
                }
            },
            "user": {
                "deposit": {
                    "limit": {
                        "rg": {
                            "exceeded": "Summan du försöker sätta in överstiger din insättningsgräns. Vänligen försök igen med en lägre summa."
                        }
                    }
                }
            }
        },
        "card_failed_psp_first_deposit_unapproved": "We apologise but the transaction could not be completed. Your previous deposit has not yet been confirmed. Please try again shortly.",
        "card_failed_psp_system_error": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
        "card_not_found": "Something techy just happened and our server didn't like it. Please contact us contact us through the help centre and we'll get to the bottom of this.\n",
        "common": {
            "bank": {
                "deposit": {
                    "loading" : "Laddar...\n",
                    "connectingToProvider": "Ansluter till leverantör. Detta kan ta en stund!",
                    "redirectingMessage": "Vänligen vänta. Du kommer snart att bli omdirigerad till din bank för att slutföra betalningen.",
                    "redirectingSubMessage": "Om du inte omdirigeras inom 10 sekunder vänligen",
                    "redirectingLinkMessage": "Klicka här",
                    "receipt": {
                        "readyToPlay": "Insättningen genomfördes!",
                        "description": "Nu är du redo för spel.",
                        "yourMoneyWillArriveSoon": "Pengarna bör visas på ditt konto inom kort.",
                        "yourMoneyWillArriveSoonDescription": "Transaktionen behandlas."
                    },
                    "error": {
                        "title": "Insättningen misslyckades",
                        "depositCancelled": "Din transaktion har avbrutits. Vänligen gör ett nytt försök om du fortfarande vill göra en insättning.",
                        "depositExpired": "Denna transaktion har hunnit löpa ut. Var god försök på nytt om du vill göra en insättning.",
                        "depositFailed": "Transaktionen kunde inte genomföras. Vänligen försök på nytt eller välj en annan betalningsmetod. \n",
                        "depositRejected": "Transaktionen misslyckades. Vänligen börja om på nytt om du vill göra en insättning. \n",
                        "referenceLocked": "Det verkar som att du redan har ett insättningsfönster öppet. Vänligen försäkra dig om att du bara gör ett insättningsförsök i taget. \n",
                        "genericException": "Något tekniskt hände precis och vår server tyckte inte om det. Vänligen försök igen om några minuter och kontakta oss om problemet kvarstår. \n",
                        "invalidReference": "Vi kan tyvärr inte hitta insättningen. Vänligen uppdatera sidan och försök igen. \n",
                        "forbiddenRequest": "Vi beklagar, tyvärr har vi inte kunnat slutföra din begäran. \n"
                    }
                }
            },
            "blockedUser": {
                "deposit": {
                    "message": "You're currently blocked from making a deposit. For more information, please contact us.",
                    "title": "Oops!"
                },
                "login": {
                    "message": "You're currently blocked from logging in. For more information, please contact us.",
                    "title": "Oops!"
                }
            },
            "deposit": {
                "amount": {
                    "deposit": "Deposit",
                    "fee": "Fee {fee}",
                    "min": "Minimum Deposit {amount}",
                    "pay": "Pay {amount} Now",
                    "personalLimit": "Oops! This exceeds your deposit limit. Please try a smaller amount.",
                    "total": "Total"
                },
                "fee": "Avgift",
                "fundsProtection": {
                    "before": "Please read our Funds Protection Information carefully and tick the box below to confirm before you click ‘Continue’.",
                    "changed": "Your level of protection has changed",
                    "confirm": "I confirm that I have read and understood the Funds Protection Information",
                    "description": "\\nWe are required by our licence to inform you about the funds in your account and how they are protected in the event of insolvency.\\n\\nWe hold customer funds separate from company funds in a client account. Player account balances, held under the UK license, will be supported by a bank guarantee.\\n\\nThis meets the UK Gambling Commission's requirements for the segregation of customer funds at the level: medium protection.\\nThe bank guarantee will be secured in case of insolvency.\\nThe customer funds will be distributed to the customer in the event of insolvency.\\n\\nThis meets the UK Gambling Commission's requirements for the segregation of customer funds at the level: medium protection.\\n\\nTo find out more about your level of protection visit the ",
                    "link": "UK Gambling Commission website",
                    "readMore": "Read more about Funds Protection"
                },
                "max": "Högsta insättning",
                "min": "Minsta insättning\n",
                "noFee": "Ingen",
                "receipt": {
                    "description": "You're now ready to play.",
                    "readyToPlay": "Deposit Successful!",
                    "yourMoneyWillArriveSoon": "The money should appear in your account shortly.",
                    "yourMoneyWillArriveSoonDescription": "Transaction in Process"
                },
                "reciept": {
                    "deposit": "Amount deposited",
                    "fee": "Fee",
                    "total": "Total Paid",
                    "transactionId": "Transaction ID"
                },
                "requireDepositLimit": {
                    "message": "You need to set your Responsible Gaming Plan before making a deposit.",
                    "title": "Please set your RGP"
                },
                "selectOtherMethod": "Ändrad betalningsmetod\n",
                "sessionExpire": {
                    "message": "This session has now expired. If you'd like to make a deposit, please reload the page.",
                    "title": "Oops!"
                }
            },
            "error": {
                "anotherMethodRequired": "Denna betalningsmetod är tyvärr inte tillgänglig för dig för tillfället. Vänligen prova en annan metod.",
                "limitExceeded": "Summan du försöker sätta in överstiger din insättningsgräns. Vänligen försök igen med en lägre summa.\n",
                "limitExceeded ": "Summan du försöker sätta in överstiger din insättningsgräns. Vänligen försök igen med en lägre summa.\n",
                "limitNotSet": "Du måste ange din insättningsgräns innan du gör en insättning.",
                "notificationNotAccepted": "Vänligen klicka i rutan för att fortsätta.",
                "genericException": "Something techy just happened and our server didn't like it. Please try again later or contact us and take comfort....our IT crew is now aware."
            },
            "generalError": "Something techy just happened and our server didn't like it. Please try again later or contact us and take comfort....our IT crew is now aware.",
            "loading": "Loading"
        },
        "deposit": {
            "amount": {
                "deposit": "Insättning",
                "fee": "Avgift {fee}",
                "max": "Högsta insättning {amount}",
                "min": "Minsta insättning {amount}",
                "pay": "Betala {amount} nu",
                "personalLimit": "Oops! Det här överstiger din insättningsgräns. Var vänlig och försök med ett lägre belopp.",
                "total": "Totalt"
            },
            "bank": {
                "title": "Bankinsättning"
            },
            "card": {
                "addNewCard": "Lägg till nytt kort",
                "cardCVVDescription": "Ange den 3-siffriga säkerhetskoden på baksidan av ditt kort",
                "cardExpiryDateDescription": "Ange vilket datum ditt kort blir ogiltigt",
                "cardExpiryDateExpired": "Utgångsdatumet du angett har redan varit. Vänligen kontrollera att ditt kort fortfarande är giltigt.",
                "cardNumberDescription": "Ange det långa nummret på framsidan av ditt kort",
                "cardNumberPlaceholder": "Kortnummer",
                "error": {
                    "cardAlreadyRegistred": "Något gick fel när vi försökte lägga till det här kortet. Vänligen kontakta oss så hjälper vi dig.",
                    "expDateToOld": "Ditt korts utgångsdatum kan inte vara i det förflutna",
                    "internalServerError": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
                    "invalidCardNumber": "Kortnummret stämmer inte. Vänligen kontrollera att du angivit rätt kortnummer.",
                    "unvalidBin": "Någonting gick fel. Vänligen kontrollera att du angett rätt kortnummer."
                },
                "expiryDate": {
                    "save": "Spara"
                },
                "expiryDescription": "Ange vilket datum ditt kort blir ogiltigt",
                "fee": "Avgift",
                "max": "Högsta insättning",
                "min": "Minsta insättning",
                "noFee": "Ingen",
                "otherOptions": "Ändra kort/alternativ",
                "selectOtherMethod": "Ändrad betalningsmetod",
                "title": "Kredit/betalkort"
            },
            "citadel": {
                "title": "Citadel"
            },
            "connectingToBank": "Ansluter till din bank. Det kan ta ett litet tag!",
            "earthport": {
                "title": "Banköverföring"
            },
            "envoyoffline": {
                "title": "Banköverföring"
            },
            "envoyoneclick": {
                "title": "Direktbanksbetalning"
            },
            "envoyoneclickideal": {
                "title": "iDEAL"
            },
            "euteller": {
                "title": "Euteller"
            },
            "fundsProtection": {
                "before": "Please read our Funds Protection Information carefully and tick the box below to confirm before you click ‘Continue’.",
                "changed": "Your level of protection has changed",
                "confirm": "I confirm that I have read and understood the Funds Protection Information",
                "description": "\\nWe are required by our licence to inform you about the funds in your account and how they are protected in the event of insolvency.\\n\\nWe hold customer funds separate from company funds in a client account. Player account balances, held under the UK license, will be supported by a bank guarantee.\\n\\nThis meets the UK Gambling Commission's requirements for the segregation of customer funds at the level: medium protection.\\nThe bank guarantee will be secured in case of insolvency.\\nThe customer funds will be distributed to the customer in the event of insolvency.\\n\\nThis meets the UK Gambling Commission's requirements for the segregation of customer funds at the level: medium protection.\\n\\nTo find out more about your level of protection visit the ",
                "firstTime": "Before you make a deposit we need to explain how your funds are protected.",
                "link": "UK Gambling Commission website",
                "readMore": "Read more about Funds Protection"
            },
            "hipay": {
                "title": "HiPay"
            },
            "hipaymistercash": {
                "title": "Bancontact/Mr Cash"
            },
            "ichequeideal": {
                "title": "iDEAL"
            },
            "maxDepositLimitFailed": "Summan överstiger max-gränsen.\n",
            "minDepositLimitFailed": "Summan understiger minimum-gränsen.\n",
            "moneybookers": {
                "title": "Skrill",
                "title ": "Skrill"
            },
            "neteller": {
                "title": "Neteller"
            },
            "noAvailableBalance": {
                "message": "Just nu kan du inte göra något uttag eftersom du inte har några pengar på ditt Unibet-konto. ",
                "title": "Oops!\n"
            },
            "paypal": {
                "title": "PayPal"
            },
            "paysafecard": {
                "title": "Paysafecard"
            },
            "phone": {
                "title": "Telefon"
            },
            "poli": {
                "title": "POLi"
            },
            "processingThirdPartyResponse": "Ansluter till din bank. Det kan ta ett litet tag!",
            "receipt": {
                "description": "Du är redo att spela",
                "readyToPlay": "Insättningen genomfördes",
                "tsi": {
                    "messagekey": "Shown on your Bank statement as \"Ticket surf International\""
                },
                "yourMoneyWillArriveSoon": "Överföringen bearbetas",
                "yourMoneyWillArriveSoonDescription": "Du kommer kunna se pengarna på ditt konto inom kort. "
            },
            "reciept": {
                "deposit": "Insatt belopp",
                "fee": "Avgift",
                "total": "Totalt inbetalt",
                "transactionId": "Transaktions-ID"
            },
            "requireDepositLimit": {
                "message": "Du måste sätta upp din plan för ansvarsfullt spelande innan du gör en insättning.",
                "title": "Vänligen ställ in din sida för Ansvarsfullt spelande."
            },
            "responsibleGamingLimitFailed": "Summan du försöker sätta in överstiger din insättningsgräns. Vänligen försök igen med en lägre summa.",
            "sessionExpire": {
                "message": "Den här sessionen har gått ut. Vänligen ladda om sidan om du vill göra en insättning.",
                "title": "Oops!"
            },
            "sparedeposit": {
                "title": "Entropay"
            },
            "thirdparty": {
                "error": {
                    "message": "Vänligen kontrollera att du angett rätt detaljer. Du kan också försöka sätta in en lägre summa eller prova ett annat kort.",
                    "title": "Din överföring kunde inte genomföras"
                }
            },
            "ukash": {
                "title": "Ukash"
            },
            "webmoney": {
                "title": "WebMoney"
            }
        },
        "depositLimitBlock": "You have reached your deposit limit of {amount} per {period}. You will be able to deposit again on {validUntil}.",
        "depositLimitInfo": "Your deposit limit allows you to deposit {amount} by {validUntil}.",
        "date": {
            "hours": "hours",
            "days": "days"
        },
        "envoyoneclick": {
            "deposit_limit_failed": "Du måste vänta lite längre innan du gör en ny insättning. Vänligen försök igen om några minuter.",
            "error": "Något tekniskt hände precis och vår server gillade det inte. Vänligen kontaka oss så tar vi reda på vad som gick fel.",
            "insufficient_funds": "Du har inte tillräckligt mycket pengar för att fortsätta med denna transaktion. Vänligen kontakta din bank.\n",
            "iovation": {
                "transaction_denied": "Sorry, the transaction cannot be completed! Please contact Customer Support."
            }
        },
        "error": {
            "bad": {
                "request": {
                    "message": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet."
                }
            },
            "couldNotLoadCustomerProfileMessage": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
            "couldNotLoadCustomerProfileTitle": "Kan inte ladda din profil",
            "couldNotLoadCustomerProfilepaycashierclient": {
                "generic": {
                    "exceptionTitle": "Oops!"
                }
            },
            "not": {
                "found": {
                    "message": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet."
                }
            },
            "provider_not_found": "Något tekniskt hände precis och vår server gillade det inte. Vänligen kontaka oss så tar vi reda på vad som gick fel.",
            "provider_settings_not_found": "Något tekniskt hände precis och vår server gillade det inte. Vänligen kontaka oss så tar vi reda på vad som gick fel.",
            "resource_not_found": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
            "server_error": {
                "message": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
                "title": "Oops!"
            },
            "unknown_error": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
            "user_not_found": "Något tekniskt hände precis och vår server gillade det inte. Vänligen kontaka oss så tar vi reda på vad som gick fel."
        },
        "generalError": "Något tekniskt hände precis och vår server gillade det inte. Vänligen kontaka oss så tar vi reda på vad som gick fel.",
        "generic": {
            "exception": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet."
        },
        "invalid_reference": "Something techy just happened and our server didn't like it.   Please try again later or contact us through the help centre.",
        "legacy": {
            "back": "Ändrad betalningsmetod",
            "withdrawal": {
                "back": "Ändra uttagsmetod\n"
            }
        },
        "listDepositMethods": {
            "error": {
                "couldNotLoadDepositMethodsMessage": "Något tekniskt hände precis och vår server gillade det inte. Vänligen försök igen senare eller kontaka oss. Vårt IT-team är medvetna om problemet.",
                "couldNotLoadDepositMethodsMessage ": "Kan inte ladda Insättningsmetoder, var god försök senare.",
                "couldNotLoadDepositMethodsTitle": "Oops!"
            },
            "fee": "Avgift",
            "maintenance": "Den här betalningsmetoden är inte tillgänglig just nu på grund av ett problem som vi jobbar med. Du kan antingen vänta på vårt magiskt skickliga IT-team eller prova en annan metod.",
            "max": "Maximum",
            "min": "Minimum",
            "minLowerThenRGP": "Din insättningsgräns tillåter inte dig att genmföra din leverantörs minstainsättning.",
            "noFee": "Ingen",
            "noMax": "Ingen",
            "noMin": "Ingen"
        },
        "listWithdrawalMethods": {
            "available": "Tillgänglig\n",
            "disabled_for_customer": "This withdrawal method is not available to you at the moment due to jurisdiction restrictions. Please select another a method.",
            "fee": "Avgift\n",
            "insufficient_funds": "Your account balance is less than the minimum withdrawal amount. Please wait until you have more money in your account before attempting to withdraw.",
            "maintenance": "Vi jobbar just nu med att lösa ett problem så den här uttagsmetoden är för närvarande inte tillgänglig. Du kan antingen vänta på att vårt mästerliga IT-team blir färdiga eller prova med en annan uttagsmetod. \n",
            "noFee": "Ingen\n",
            "time": "Tid\n"
        },
        "thirdparty": {
            "timeout": {
                "message": "Sidan tog för lång tid att ladda upp. Vänligen försök senare eller kontakta oss för hjälp. Vårt IT-team är medvetna om problemet. ",
                "title": "Oops!"
            }
        },
        "too_many_cards": "Du har lagt till det högsta antalet aktiva kort vi tillåter.",
        "withdrawal": {
            "card": {
                "processingtime": "1-3 dagar\n",
                "title": "Kredit/betalkort"
            },
            "citadel": {
                "processingtime": "3-5 dagar\n",
                "title": "Citadel"
            },
            "earthport": {
                "processingtime": "3-5 dagar\n",
                "title": "banköverföring"
            },
            "envoyoneclick": {
                "processingtime": "3-5 dagar\n",
                "title": "Direktbanksbetalning"
            },
            "moneybookers": {
                "processingtime": "3-5 dagar\n",
                "title": "Skrill"
            },
            "neteller": {
                "processingtime": "3-5 dagar\n",
                "title": "Neteller"
            },
            "paypal": {
                "processingtime": "Up to 12 hours",
                "title": "Paypal"
            },
            "paysafecard": {
                "processingtime": "3-5 dagar\n",
                "title": "Paysafecard"
            },
            "payson": {
                "processingtime": "3-5 dagar\n",
                "title": "Payson"
            },
            "phone": {
                "processingtime": "3-5 dagar\n",
                "title": "Telefon"
            },
            "sparedeposit": {
                "processingtime": "3-5 dagar\n",
                "title": "Alternative deposit\n"
            }
        }
    },
    "entercash-withdrawal": {
        "error": {
            "genericException": "Något tekniskt hände precis och vår server tyckte inte om det. Vänligen försök igen om några minuter och kontakta oss om problemet kvarstår. \n",
            "timeout": "The request timed out."
        }
    },
    "entercash": {
        "title": "entercash",
        "error": {
            "aboveMaxDepositLimit": "Summan du angett överstiger för gräns för insättningar med paysafekort. Vänligen försök igen med ett mindre belopp. \n",
            "testerror1": {
                "title": "This is a testerror1 title",
                "text": "This is a testerror1 text"
            },
            "testerror2": {
                "text": "This is a testerror2 text"
            },
            "testerror3": {
                "title": "This is a testerror3 text"
            }
        }
    }
};

mock('translations', translations);

mock('')


Object.assign(global, {
    sinon,
    expect: chai.expect,
    window,
    parent,
    document,
    config
});


/**
 * Now we should attach some properties
 * of [window] object to [global] in
 * order to use them as usual, without "window." prefix.
 * Only now because we assign some of them in <setupPolyfills.js>
 */

Object.assign(
    global,
    ['navigator', 'location', 'CustomEvent', 'Event', 'fetch']
        .reduce((res, key) => Object.assign({}, res, {[key]: global.window[key]}), {})
);
