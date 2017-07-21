// ===============================================
// Contains common methods for all default styling
// ===============================================

import {css} from 'styled-components';

export const Container = {
    getDefaultStyle: (theme) => css`
        display: flex;
        
        ${getImageStyles(theme)}
    
        ${getSpriteStyles(theme)}
    `
};

export const Sprite = {
    getDefaultStyle: () => css`
        display: inline-block;
        vertical-align: middle;
        height: 15px;
        width: 25px;
    `
};

const getImageStyles = () => css`
    .Logo-visa, .Logo-ucardvisa {
        width: 34px;
        height: 11px;
    }
    .Logo-mastercard {
        width: 31px;
        height: 19px;
    }
    .Logo-maestro, .Logo-ucardmaestro {
        width: 30px;
        height: 18px;
    }
    .Logo-solo, .Logo-switch {
        width: 16px;
        height: 20px;
    }
    .Logo-entropay, .Logo-uentropay, .Logo-uentropaylogo {
        width: 61px;
        height: 12px;
    }
    .Logo-electron, .Logo-ucardelectron {
        width: 32px;
        height: 22px;
    }
    .Logo-uabaqoos {
        width: 77px;
        height: 24px;
    }
    .Logo-umistercash {
        width: 35px;
        height: 24px;
    }
    .Logo-uboletobancario {
        width: 31px;
        height: 30px;
    }
    .Logo-ubpay {
        width: 61px;
        height: 30px;
    }
    .Logo-ucitadel {
        width: 61px;
        height: 30px;
    }
    .Logo-uearthport {
        width: 54px;
        height: 30px;
    }
    .Logo-uekonto {
        width: 39px;
        height: 22px;
    }
    .Logo-uenvoy {
        width: 89px;
        height: 30px;
    }
    .Logo-uepay {
        width: 130px;
        height: 30px;
    }
    .Logo-ueuteller {
        width: 100px;
        height: 24px;
    }
    .Logo-uewire {
        width: 123px;
        height: 30px;
    }
    .Logo-ufundsend {
        width: 133px;
        height: 24px;
    }
    .Logo-uhansapank {
        width: 203px;
        height: 30px;
    }
    .Logo-uideal {
        width: 120px;
        height: 30px;
    }
    .Logo-umastercardsecurecode {
        width: 68px;
        height: 25px;
    }
    .Logo-umonetaru {
        width: 74px;
        height: 30px;
    }
    .Logo-umultibanco {
        width: 19px;
        height: 22px;
    }
    .Logo-uneteller {
        width: 95px;
        height: 17px;
    }
    .Logo-upaypal {
        width: 118px;
        height: 30px;
    }
    .Logo-uentercash {
        width: 91px;
        height: 21px;
    }
    .Logo-uhipay {
        width: 56px;
        height: 32px;
    }
    .Logo-ubancontact {
        width: 135px;
        height: 17px;
    }
    .Logo-upaysafecard {
        width: 89px;
        height: 17px;
    }
    .Logo-uskrill {
        width: 75px;
        height: 26px;
    }
    .Logo-umbankomat {
        width: 146px;
        height: 32px;
    }
    .Logo-upayson {
        width: 89px;
        height: 29px;
    }
    .Logo-upoli {
        width: 59px;
        height: 21px;
    }
    .Logo-upostepay {
        width: 95px;
        height: 20px;
    }
    .Logo-uprzelewy24 {
        width: 34px;
        height: 12px;
    }
    .Logo-usmallbpay {
        width: 21px;
        height: 30px;
    }
    .Logo-usmallideal {
        width: 24px;
        height: 21px;
    }
    .Logo-ubanktobank {
        width: 60px;
        height: 19px;
    }
    .Logo-usofortuberweisung {
        width: 79px;
        height: 30px;
    }
    .Logo-usporopay {
        width: 154px;
        height: 30px;
    }
    .Logo-uteleingreso {
        width: 125px;
        height: 30px;
    }
    .Logo-utrustwaveblue {
        width: 60px;
        height: 30px;
    }
    .Logo-utrustwavegreen {
        width: 59px;
        height: 30px;
    }
    .Logo-uukash {
        width: 51px;
        height: 21px;
    }
    .Logo-uwebmoney {
        width: 113px;
        height: 28px;
    }
    .Logo-umoneybookers {
        width: 53px;
        height: 19px;
    }
`;

const getSpriteStyles = () => css`
    .Logo-oldSprite {
        background: no-repeat -100px 0;
    }
    .Logo-uCardVisa {
        width: 23px;
        height: 14px;
        background-position: 0 -37px;
    }
    .Logo-uGenericCards {
        background-position: -0px -36px;
        height: 34px;
        width: 80px;
    }
    .Logo-uCardElectron {
        width: 23px;
        height: 14px;
        background-position: -27px -37px;
    }
    .Logo-uCardMasterCard {
        width: 23px;
        height: 14px;
        background-position: -57px -38px;
    }
    .Logo-uCardMaestro {
        width: 23px;
        height: 14px;
        background-position: -88px -38px;
    }
    .Logo-uCardSolo {
        width: 23px;
        height: 14px;
        background-position: -116px -38px;
    }
    .Logo-uCardSwitch {
        width: 23px;
        height: 14px;
        background-position: -144px -38px;
    }
    .Logo-uVisaLogo {
        background-position: -87px -673px;
        height: 44px;
        width: 50px;
    }
    .Logo-uMasterCardLogo {
        background-position: -153px -674px;
        height: 44px;
        width: 49px;
    }
    .Logo-uTrustwaveBlueLogo {
        background-position: 0 -588px;
        height: 44px;
        width: 84px;
    }
    .Logo-uEarthPort {
        width: 43px;
        height: 20px;
        background-position: 0 -109px;
    }
    .Logo-uCitadel {
        width: 66px;
        height: 21px;
        background-position: -65px -643px;
    }
    .Logo-uNetEller  {
        width: 75px;
        height: 14px;
        background-position: -82px -227px;
    }
    .Logo-uPayPal  {
        width: 100px;
        height: 25px;
        background-position: 0px -729px;
    }
    .Logo-uPayPalSmall  {
        width: 68px;
        height: 20px;
        background-position: 0px -762px;
    }
    .Logo-uSEB  {
        width: 33px;
        height: 13px;
        background-position: -168px -227px;
    }
    .Logo-uMoneyBookers  {
        width: 47px;
        height: 18px;
        background-position: -4px -193px;
    }
    .Logo-uClickandBuy {
        width: 95px;
        height: 17px;
        background-position: -145px -109px;
    }
    .Logo-uClickandBuySmall {
        width: 31px;
        height: 20px;
        background-position: -303px -109px;
    }
    .Logo-uIdeal {
        width: 23px;
        height: 19px;
        background-position: -270px -109px;
    }
    .Logo-uUkash {
        width: 57px;
        height: 21px;
        background-position: -97px -151px;
    }
    .Logo-uAbaqoos {
        width: 66px;
        height: 20px;
        background-position: -215px -227px;
    }
    .Logo-uBoletoBancario {
        width: 41px;
        height: 20px;
        background-position: -295px -227px;
    }
    .Logo-uEntropay {
        width: 30px;
        height: 20px;
        background-position: -177px -151px;
    }
    .Logo-uEntroPayLogo {
        width: 100px;
        height: 19px;
        background-position: -239px -380px;
    }
    .Logo-uEnvoy {
        width: 16px;
        height: 20px;
        background-position: -230px -151px;
    }
    .Logo-uBuxter {
        width: 61px;
        height: 20px;
        background-position: -275px -151px;
    }
    .Logo-uEntercash{
        width: 115px;
        height: 21px;
        background-position: -81px -191px;
    }
    .Logo-uPaySafeCard {
        width: 115px;
        height: 21px;
        background-position: -81px -191px;
    }
    .Logo-uSkrill {
        width: 115px;
        height: 21px;
        background-position: -81px -191px;
    }
    .Logo-uPrzelewy24 {
        width: 59px;
        height: 20px;
        background-position: -226px -191px;
    }
    .Logo-uMultibanco {
        width: 23px;
        height: 20px;
        background-position: -304px -191px;
    }
    .Logo-uWebMoney {
        width: 72px;
        height: 19px;
        background-position: 0 -151px;
    }
    .Logo-uEuteller {
        width: 85px;
        height: 20px;
        background-position: 0 -257px;
    }
    .Logo-uEwire {
        width: 85px;
        height: 20px;
        background-position: -95px -257px;
    }
    .Logo-uPayson {
        width: 65px;
        height: 20px;
        background-position: -186px -256px;
    }
    .Logo-uPoli {
        width: 44px;
        height: 20px;
        background-position: -263px -253px;
    }
    .Logo-uSkrill {
        width: 59px;
        height: 28px;
        background-position: -194px -636px;
    }
    .Logo-uHiPay {
        width: 59px;
        height: 28px;
        background-position: -194px -636px;
    }
    .Logo-uBpay {
        width: 43px;
        height: 20px;
        background-position: -212px -691px;
    }

    .Logo-uPayr {
        width: 78px;
        height: 27px;
        background-position: -210px -665px;
    }

    .Logo-uSmallPayr {
        width: 52px;
        height: 18px;
        background-position: -287px -665px;
    }

    .Logo-uSofortuberweisung {
        width: 122px;
        height: 16px;
        background-position: 0 -290px;
    }
    .Logo-uMonetaRu {
        width: 121px;
        height: 10px;
        background-position: -139px -289px;
    }
    .Logo-uUPS {
        width: 25px;
        height: 20px;
        background-position: -276px -290px;
    }
    .Logo-uTeleIngreso {
        width: 95px;
        height: 20px;
        background-position: 0 -318px;
    }
    .Logo-uFundSend {
        width: 89px;
        height: 20px;
        background-position: -107px -318px;
    }
    .Logo-uEpay {
        width: 63px;
        height: 20px;
        background-position: -207px -318px;
    }
    .Logo-uBankToBank {
        width: 56px;
        height: 20px;
        background-position: -280px -318px;
    }
    .Logo-uHansapank {
        width: 89px;
        height: 20px;
        background-position: 0 -353px;
    }
    .Logo-uUnetSeb {
        width: 27px;
        height: 20px;
        background-position: -104px -353px;
    }
    .Logo-uEkonto {
        width: 85px;
        height: 16px;
        background-position: -141px -353px;
    }
    .Logo-uNordeaSampo {
        width: 38px;
        height: 20px;
        background-position: -241px -353px;
    }
    .Logo-uVersignSecured {
        width: 86px;
        height: 44px;
        background-position: 0 -403px;
    }
    .Logo-uTrustwaveBlue {
        width: 84px;
        height: 43px;
        background-position: 0 -589px;
    }
    .Logo-uTrustwaveGreen {
        width: 84px;
        height: 43px;
        background-position: -94px -589px;
    }
    .Logo-uVerifiedByVisa  {
        width: 67px;
        height: 37px;
        background-position: -185px -403px;
    }
    .Logo-uMasterCardSecureCode {
        width: 85px;
        height: 30px;
        background-position: -93px -403px;
    }
    .Logo-uCVCcard {
        width: 34px;
        height: 20px;
        background-position: -60px 0;
    }
    .Logo-uMisterCash {
        width: 38px;
        height: 21px;
        background-position: -293px -352px;
    }
    .Logo-uSporopay {
        width: 69px;
        height: 13px;
        background-position: -270px -420px;
    }
    .Logo-uPostepay {
        width: 56px;
        height: 21px;
        background-position: 0 -642px;
    }

    .Logo-uVisaMCByHipay {
        width: 177px;
        height: 29px;
        background-position: 2px -52px;
    }

    .Logo-uVisaMCByHipaySmall {
        width: 110px;
        height: 17px;
        background-position: -175px -53px;
    }

    .Logo-uGluepay,
    .Logo-uSmallGluepay {
        width: 126px;
        height: 25px;
        background-position: 0 -376px;
    }
    .Logo-uSwiftVoucher {
        width: 137px;
        height: 38px;
        background-position: -202px -589px;
    }

    /* Other payment override */
    .Logo-otherList .uIcons div {
        margin-right: 1px;
    }

    /** Small icons for other payment tab **/
    .Logo-uSmallIdeal {
        width: 19px;
        height: 20px;
        background-position: 0px -467px;
    }
    .Logo-uSmallClickandBuy {
        width: 31px;
        height: 20px;
        background-position: -27px -466px;
    }
    .Logo-uSmallWebMoney {
        width: 48px;
        height: 20px;
        background-position: -73px -468px;
    }
    .Logo-uSmallUkash {
        width: 45px;
        height: 20px;
        background-position: -128px -468px;
    }
    .Logo-uSmallMoneyBookers {
        width: 35px;
        height: 14px;
        background-position: -182px -469px;
    }
    .Logo-uSmallHiPay {
        width: 48px;
        height: 20px;
        background-position: -224px -470px;
    }
    .Logo-uSmallPaySafeCard {
        width: 48px;
        height: 20px;
        background-position: -224px -470px;
    }
    .Logo-uSmallSkrill {
        width: 48px;
        height: 20px;
        background-position: -224px -470px;
    }
    .Logo-uSmallEntercash {
        width: 48px;
        height: 20px;
        background-position: -224px -470px;
    }
    .Logo-uSmallPrzelewy24 {
        width: 47px;
        height: 20px;
        background-position: -281px -466px;
    }
    .Logo-uSmallMultibanco {
        width: 20px;
        height: 20px;
        background-position: 0px -499px;
    }
    .Logo-uSmallNetEller {
        width: 47px;
        height: 20px;
        background-position: -27px -497px;
    }
    .Logo-uSmallAbaqoos {
        width: 48px;
        height: 20px;
        background-position: -80px -497px;
    }
    .Logo-uSmallBoletoBancario {
        width: 33px;
        height: 20px;
        background-position: -136px -496px;
    }
    .Logo-uSmallEuteller {
        width: 48px;
        height: 20px;
        background-position: -180px -496px;
    }
    .Logo-uSmallEwire {
        width: 47px;
        height: 20px;
        background-position: -237px -495px;
    }
    .Logo-uSmallPayson {
        width: 47px;
        height: 20px;
        background-position: -289px -494px;
    }
    .Logo-uSmallPoli {
        width: 32px;
        height: 20px;
        background-position: 0px -525px;
    }
    .Logo-uSmallSkrill {
        width: 35px;
        height: 17px;
        background-position: -256px -647px;
    }
    .Logo-uSmallHiPay {
        width: 35px;
        height: 17px;
        background-position: -256px -647px;
    }
    .Logo-uSmallBpay {
        width: 39px;
        height: 16px;
        background-position: -258px -695px;
    }

    .Logo-uSmallSofortuberweisung {
        width: 47px;
        height: 20px;
        background-position: -42px -525px;
    }
    .Logo-uSmallMonetaRu {
        width: 48px;
        height: 20px;
        background-position: -97px -524px;
    }
    .Logo-uSmallUPS {
        width: 21px;
        height: 20px;
        background-position: -154px -523px;
    }
    .Logo-uSmallTeleIngreso {
        width: 48px;
        height: 20px;
        background-position: -183px -522px;
    }
    .Logo-uSmallFundSend {
        width: 48px;
        height: 20px;
        background-position: -240px -522px;
    }
    .Logo-uSmallEpay {
        width: 43px;
        height: 20px;
        background-position: -296px -521px;
    }
    .Logo-uSmallBankToBank {
        width: 46px;
        height: 20px;
        background-position: -0px -551px;
    }
    .Logo-uSmallHansapank {
        width: 47px;
        height: 20px;
        background-position: -57px -552px;
    }
    .Logo-uSmallUnetSeb {
        width: 19px;
        height: 20px;
        background-position: -111px -551px;
    }
    .Logo-uSmallEkonto {
        width: 47px;
        height: 20px;
        background-position: -141px -551px;
    }
    .Logo-uSmallMisterCash {
        width: 30px;
        height: 19px;
        background-position: -198px -549px;
    }
    .Logo-uSmallSporopay {
        width: 48px;
        height: 10px;
        background-position: -240px -554px;
    }
    .Logo-uSmallPostepay {
        width: 45px;
        height: 17px;
        background-position: -294px -548px;
    }
    .Logo-uSmallCitadel {
        width: 53px;
        height: 20px;
        background-position: -140px -647px;
    }
`;
