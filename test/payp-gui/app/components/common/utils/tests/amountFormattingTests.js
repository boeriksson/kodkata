import amountFormatting, { fromString, getTail, getCaretPosition } from '../amountFormatting';

describe('amountFormatting', () => {
    const toString = amountFormatting.toString;
    const setFormat = amountFormatting.setFormat;
    const roundHalfUpAwayFromZero = amountFormatting.roundHalfUpAwayFromZero;
    const format = {
        thousands: ' ',
        first: false,
        decimal: ',',
        separator: ' ',
        currency: '$'
    };
    setFormat(format);

    describe('toString', () => {
        it('should load', () => {
            expect(toString).to.exist();
        });

        it('should throw type error', () => {
            expect(toString).to.throw(Error);
            function delayCall123() {
                toString('123');
            }
            expect(delayCall123).to.throw(Error);
        });

        it('should handle non-special numbers.', () => {
            expect(toString(0, true)).to.equal('0');
            expect(toString(123, true)).to.equal('123');
        });

        it('should handle decimals.', () => {
            expect(toString(0.0, true)).to.equal('0');
            expect(toString(123.123, true)).to.equal('123,12');
            expect(toString(123.777, true)).to.equal('123,78');
            expect(toString(123.70, true)).to.equal('123,7');
            expect(toString(123.07, true)).to.equal('123,07');
        });

        it('should handle thousands.', () => {
            expect(toString(0, true)).to.equal('0');
            expect(toString(1234, true)).to.equal('1 234');
            expect(toString(1234567, true)).to.equal('1 234 567');
        });

        it('should handle thousands and deciamls', () => {
            expect(toString(1234567.891, true)).to.equal('1 234 567,89');
        });

        it('should handle negative numbers', () => {
            expect(toString(-0, true)).to.equal('0');
            expect(toString(-123, true)).to.equal('-123');
            expect(toString(-1234, true)).to.equal('-1 234');
            expect(toString(-1234.567, true)).to.equal('-1 234,57');
        });

        it('should handle fixed decimals', () => {
            expect(toString(0, true, null, true)).to.equal('0,00');
            expect(toString(0.1, true, null, true)).to.equal('0,10');
            expect(toString(0.12, true, null, true)).to.equal('0,12');
            expect(toString(0.123, true, null, true)).to.equal('0,12');
            expect(toString(0.125, true, null, true)).to.equal('0,13');
            expect(toString(NaN, true, null, true)).to.equal('NaN');
        });
    });

    describe('fromString', () => {
        it('should load', () => {
            expect(fromString).to.exist();
        });

        it('should throw type error', () => {
            expect(fromString).to.throw(Error);
            function delayCall123() {
                fromString(123);
            }
            expect(delayCall123).to.throw(Error);
        });

        it('should handle non-special numbers', () => {
            expect(fromString('0')).to.equal(0);
            expect(fromString('123')).to.equal(123);
        });

        it('should handle decimals', () => {
            expect(fromString(',')).to.equal(0);
            expect(fromString('0,0')).to.equal(0);
            expect(fromString('123,123')).to.equal(123.12);
            expect(fromString('123,777')).to.equal(123.78);
            expect(fromString('123,70')).to.equal(123.7);
            expect(fromString('123,07')).to.equal(123.07);
            expect(fromString('123,005')).to.equal(123.01);
            expect(fromString('123,7')).to.equal(123.7); // PAY-10231
            expect(fromString('9000,8')).to.equal(9000.8); // PAY-10231
        });

        it('should handle extra characters', () => {
            expect(fromString('1 2 34 5,67,891')).to.equal(12345.68);
            expect(fromString('. 1 2 34 5,6,7,891,,,,   ')).to.equal(12345.68);
        });

        it('should handle thousands', () => {
            expect(fromString('0')).to.equal(0);
            expect(fromString('1 234')).to.equal(1234);
            expect(fromString('1 234 567')).to.equal(1234567);
        });

        it('should handle thousands and decimals', () => {
            expect(fromString('1 234 567,891')).to.equal(1234567.89);
        });

        it('should truncate before formatting', () => {
            expect(fromString('1,896', true)).to.equal(1.89);
            expect(fromString('1,896', false)).to.equal(1.90);
            expect(fromString('1,894', true)).to.equal(1.89);
            expect(fromString('1,894', false)).to.equal(1.89);
        });
    });

    describe('roundHalfUpAwayFromZero', () => { // PAY-10231
        it('should round half up away from zero', () => {
            expect(roundHalfUpAwayFromZero(1)).to.equal(1);
            expect(roundHalfUpAwayFromZero(1.1)).to.equal(1.1);
            expect(roundHalfUpAwayFromZero(1.100)).to.equal(1.1);
            expect(roundHalfUpAwayFromZero(1.101)).to.equal(1.1);
            expect(roundHalfUpAwayFromZero(1.555)).to.equal(1.56);
            expect(roundHalfUpAwayFromZero(-1.555)).to.equal(-1.56);
            expect(roundHalfUpAwayFromZero(1.559)).to.equal(1.56);
            expect(roundHalfUpAwayFromZero(9000.8)).to.equal(9000.8);
        });
    });

    describe('getTail', () => {
        setFormat(format);

        it('sould load', () => {
            expect(getTail).to.exist();
        });

        it('should throw type error', () => {
            expect(getTail).to.throw(Error);
            function delayCall1() {
                getTail(1);
            }
            expect(delayCall1).to.throw(Error);
        });

        it('should handle no decimal sign', () => {
            expect(getTail('12')).to.equal('');
            expect(getTail('10')).to.equal('');
            expect(getTail('100')).to.equal('');
        });

        it('should handle single decimal sign', () => {
            expect(getTail('123,')).to.equal(',');
            expect(getTail('123,,')).to.equal(',');
            expect(getTail('123,1')).to.equal('');
            expect(getTail('123,0123')).to.equal('');
            expect(getTail('123,0123,')).to.equal('');
            expect(getTail('123,0,1,2,3,')).to.equal('');
        });

        it('should handle zero value decimals', () => {
            expect(getTail('123,0')).to.equal(',0');
            expect(getTail('123,00')).to.equal(',00');
            expect(getTail('123,000')).to.equal(',00');
            expect(getTail('123,001')).to.equal(',00');
            expect(getTail('123,005')).to.equal(',00');
            expect(getTail('123,005,0')).to.equal(',00');
            expect(getTail('123,05')).to.equal('');
            expect(getTail('123,0500')).to.equal('');
        });

        it('should handle lone trailing zeroes', () => {
            expect(getTail('123,10')).to.equal('0');
            expect(getTail('123,200')).to.equal('0');
            expect(getTail('123,440')).to.equal('');
        });
    });

    describe('getCaretPosition', () => {
        setFormat(format);

        it('sould load', () => {
            expect(getCaretPosition).to.exist();
        });

        it('should throw type error', () => {
            expect(getCaretPosition).to.throw(Error);

            function delayCall1() {
                getCaretPosition(123);
            }
            expect(delayCall1).to.throw(Error);

            function delayCall2() {
                getCaretPosition(123, '123');
            }
            expect(delayCall2).to.throw(Error);

            function delayCall3() {
                getCaretPosition(123, '123');
            }
            expect(delayCall3).to.throw(Error);

            function delayCall4() {
                getCaretPosition('1', '123');
            }
            expect(delayCall4).to.throw(Error);

            function delayCall5() {
                getCaretPosition(1, 123);
            }
            expect(delayCall5).to.throw(Error);
        });

        it('should handle normal case', () => {
            expect(getCaretPosition(0, '')).to.equal(0);
            expect(getCaretPosition(0, '123')).to.equal(0);
            expect(getCaretPosition(1, '123')).to.equal(1);
            expect(getCaretPosition(2, '123')).to.equal(2);
        });

        it('should handle one thousands', () => {
            // '1234' -> '1 234'
            expect(getCaretPosition(0, '1234')).to.equal(0);
            expect(getCaretPosition(1, '1234')).to.equal(1);
            expect(getCaretPosition(2, '1234')).to.equal(3);
            expect(getCaretPosition(3, '1234')).to.equal(4);
        });

        it('should handle several thousands', () => {
            // '1234567' -> '1 234 567'
            expect(getCaretPosition(0, '1234567')).to.equal(0);
            expect(getCaretPosition(2, '1234567')).to.equal(3);
            expect(getCaretPosition(6, '1234567')).to.equal(8);
            expect(getCaretPosition(7, '1234567')).to.equal(9);
        });

        it('should handle decimals', () => {
            // '123,456' -> '123,45'
            expect(getCaretPosition(0, '123,456')).to.equal(0);
            expect(getCaretPosition(4, '123,456')).to.equal(4);
            expect(getCaretPosition(6, '123,456')).to.equal(6);
            expect(getCaretPosition(7, '123,456')).to.equal(6);
        });

        it('should handle tail', () => {
            expect(getCaretPosition(2, '0,')).to.equal(2);
            expect(getCaretPosition(2, '0,0')).to.equal(2);
            expect(getCaretPosition(3, '0,0')).to.equal(3);
            expect(getCaretPosition(4, '0,000')).to.equal(4);
            expect(getCaretPosition(5, '0,000')).to.equal(4);
        });

        it('should handle extra characters', () => {
            expect(getCaretPosition(3, '1 2 3,456')).to.equal(2);
            expect(getCaretPosition(5, '12   56$$')).to.equal(3);
            expect(getCaretPosition(6, 'fi1 2 3')).to.equal(2);
            expect(getCaretPosition(7, '1 2 3 5,23')).to.equal(5);
            expect(getCaretPosition(6, '1 2,3 5,23')).to.equal(4);
        });
        it('should handle early zeroes', () => {
            // 0012,345 -> 12,34
            expect(getCaretPosition(1, '0012,345')).to.equal(0);
            expect(getCaretPosition(5, '0012,345')).to.equal(3);
            expect(getCaretPosition(1, '00,345')).to.equal(0);
            expect(getCaretPosition(4, '00,345')).to.equal(3);
        });
        it('should handle decimal first', () => {
            // ,12,345 -> 0,12
            expect(getCaretPosition(1, ',12,345')).to.equal(2);
        });
    });
    describe('setFormat', () => {
        it('sould load', () => {
            expect(setFormat).to.exist();
        });

        it('should throw type error', () => {
            expect(setFormat).to.throw(Error);

            function delayCall1() {
                format.decimal = '2';
                setFormat(format);
            }
            expect(delayCall1).to.throw(Error);

            function delayCall2() {
                format.decimal = '2';
                format.thousands = '.';
                setFormat(format);
            }
            expect(delayCall2).to.throw(Error);

            function delayCall3() {
                format.decimal = 'ab';
                format.thousands = '.';
                setFormat(format);
            }
            expect(delayCall3).to.throw(Error);

            function delayCall4() {
                format.decimal = 2;
                format.thousands = '.';
                setFormat(format);
            }
            expect(delayCall4).to.throw(Error);

            function delayCall5() {
                format.decimal = '.';
                format.thousands = '.';
                setFormat(format);
            }
            expect(delayCall5).to.throw(Error);
        });

        it('should handle new decimal sign', () => {
            format.decimal = '&';
            format.thousands = '%';
            setFormat(format);
            expect(toString(1.2, true)).to.equal('1&2');
            expect(fromString('1.2')).to.equal(12);
            expect(fromString('1&2')).to.equal(1.2);
        });

        it('should handle new thousands sign', () => {
            format.decimal = '&';
            format.thousands = '%';
            setFormat(format);
            expect(toString(1234, true)).to.equal('1%234');
            expect(fromString('1%234')).to.equal(1234);
        });

        it('should handle new thousands and decimal sign', () => {
            format.decimal = '&';
            format.thousands = '%';
            setFormat(format);
            expect(toString(1234.56, true)).to.equal('1%234&56');
            expect(fromString('1%234&56')).to.equal(1234.56);
        });

        it('should handle reverse . and ,', () => {
            format.decimal = ',';
            format.thousands = '.';
            setFormat(format);
            expect(toString(1234.56, true)).to.equal('1.234,56');
            expect(fromString('1.234,56')).to.equal(1234.56);
            format.decimal = '.';
            format.thousands = ',';
            setFormat(format);
            expect(toString(1234.56, true)).to.equal('1,234.56');
            expect(fromString('1,234.56')).to.equal(1234.56);
        });

        it('should show sign', () => {
            format.first = false;
            format.currency = 'kr';
            format.separator = ' ';
            setFormat(format);
            expect(toString(123)).to.equal('123 kr');

            format.first = true;
            format.currency = 'kr';
            format.separator = ' ';
            setFormat(format);
            expect(toString(123)).to.equal('kr 123');

            format.first = true;
            format.currency = '$';
            format.separator = '';
            setFormat(format);
            expect(toString(123)).to.equal('$123');

            format.first = false;
            format.currency = '�';
            format.separator = '';
            setFormat(format);
            expect(toString(123)).to.equal('123�');
        });
    });
});
