import React from 'react';
import PropTypes from 'prop-types';
import context from 'context';
import styled from 'styled-components';

import CoreComponents from '@kindred-payment/pay-provider-ui-common/lib/CoreComponents';
import PaymentComponents from '@kindred-payment/pay-provider-ui-common/lib/PaymentComponents';

import postToParent from '../../../common/utils/postToParent';
import amountFormatting from '../../../common/utils/amountFormatting';
import { translate } from '../../../common/translationActions';

const Icon = CoreComponents.icon;
const TwoColumnLayout = PaymentComponents.twoColumnLayout;

const titleStyles = (props) => props.theme.skins.Receipt.Title(props);
const rowStyles = (props) => props.theme.skins.Receipt.Row(props);
const headerStyles = (props) => props.theme.skins.Receipt.Header(props);
const valueStyles = (props) => props.theme.skins.Receipt.Value(props);
const successStyles = (props) => props.theme.skins.Receipt.Success(props);

const StyledTitle = styled.h3`${titleStyles}`;
const StyledRow = styled.div`${rowStyles}`;
const StyledHeader = styled.div`${headerStyles}`;
const StyledValue = styled.div`${valueStyles}`;
const StyledSuccess = styled.div`${successStyles}`;

const amountToString = amountFormatting.toString;

function getDepositCounts(receipt, hasFirstDeposit) {
    let depositCounts;
    if (receipt.depositCount !== -1) {
        depositCounts = receipt.depositCount;
    } else {
        depositCounts = hasFirstDeposit ? 3 : 1;
    }
    return depositCounts;
}

const Receipt = ({ receipt, titleKey, hasFirstDeposit }) => {
    let leftSide;

    const depositCounts = getDepositCounts(receipt, hasFirstDeposit);
    const message = {
        type: 'depositCompleted',
        status: 'Completed',
        amount: receipt.amount.amount,
        currency: receipt.amount.currencyCode,
        paymentTransactionId: receipt.transactionId,
        noOfDeposits: depositCounts,
        paymentMethodClassification: 'BANK_TRANSFER',
        paymentMethod: `${config.module}`,
        firstDeposit: receipt.depositCount === 1 || !hasFirstDeposit,
        merchant: context.brand,
        country: context.isoCountryCode
    };
    postToParent(message);

    if (receipt.ongoing) {
        leftSide = (
            <StyledSuccess>
                <div>
                    <Icon icon="sandWatch"/>
                </div>
                <div>
                    <h4 data-test-name="DepositConfirm-Title">
                        { translate('paycashierclient.common.bank.deposit.receipt.yourMoneyWillArriveSoon') }
                    </h4>
                    <p data-test-name="DepositConfirm-Message">
                        { translate('paycashierclient.common.bank.deposit.receipt.yourMoneyWillArriveSoonDescription') }
                    </p>
                </div>
            </StyledSuccess>
        );
    } else {
        leftSide = (
            <StyledSuccess>
                <div>
                    <Icon icon="success"/>
                </div>
                <div>
                    <h4 data-test-name="DepositConfirm-Title">
                        { translate('paycashierclient.common.bank.deposit.receipt.readyToPlay') }
                    </h4>
                    <p data-test-name="DepositConfirm-Message">
                        { translate('paycashierclient.common.bank.deposit.receipt.description') }
                    </p>
                </div>
            </StyledSuccess>
        );
    }

    const { fee, transactionId, amount, total } = receipt;
    const feeAmountRow = fee.amount ?
        (
            <StyledRow>
                <StyledHeader data-test-name="DepositReceiptLabel-Fee">
                    { translate('paycashierclient.deposit.reciept.fee') }
                </StyledHeader>
                <StyledValue data-test-name="DepositReceiptValue-Fee">
                    <span>{ amountToString(fee.amount) }</span>
                </StyledValue>
            </StyledRow>
        ) : '';

    return (
        <TwoColumnLayout
            className="DepositConfirm DepositConfirm_test" testName="DepositConfirm_test"
            firstColumnContent={
                <div className="two-column-inner">
                    <StyledTitle data-test-name="DepositConfirm-Header">
                        {translate(titleKey)}
                    </StyledTitle>
                    {leftSide}
                </div>
            }
            secondColumnContent={
                <div className="two-column-inner">
                    <div className="DepositReceipt" data-test-name="DepositReceipt_test">
                        <StyledRow>
                            <StyledHeader data-test-name="DepositReceiptLabel-TransactionId">
                                { translate('paycashierclient.deposit.reciept.transactionId') }
                            </StyledHeader>
                            <StyledValue data-test-name="DepositReceiptValue-TransactionId">
                                { transactionId }
                            </StyledValue>
                        </StyledRow>
                        <StyledRow>
                            <StyledHeader data-test-name="DepositReceiptLabel-Amount">
                                { translate('paycashierclient.deposit.reciept.deposit') }
                            </StyledHeader>
                            <StyledValue data-test-name="DepositReceiptValue-Amount">
                                <span>{ amountToString(amount.amount) }</span>
                            </StyledValue>
                        </StyledRow>
                        { feeAmountRow }
                        <StyledRow isOnTotalRow={true}>
                            <StyledHeader data-test-name="DepositReceiptLabel-Total">
                                { translate('paycashierclient.deposit.reciept.total') }
                            </StyledHeader>
                            <StyledValue data-test-name="DepositReceiptValue-Total">
                                <span>{ amountToString(total.amount) }</span>
                            </StyledValue>
                        </StyledRow>
                    </div>
                </div>
            }
        />
    );
};

Receipt.propTypes = {
    receipt: PropTypes.object,
    itleKey: PropTypes.string,
    hasFirstDeposit: PropTypes.bool
};

export default Receipt;
