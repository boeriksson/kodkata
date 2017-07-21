import context from 'context';

const locale = context.locale;

const localeFormating = {
    /* Format settings for each locale */
    fallback: {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Austrian-German
    'de_AT': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: '',
        currencyFirst: false
    },
    // Belgium-Dutch
    'nl_BE': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: true
    },
    // Belgium-French
    'fr_BE': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Brazil-Portugese
    'pt_BR': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Bulgarian
    'bg_BG': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Croatian
    'hr_HR': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: true
    },
    // Czech
    'cs_CZ': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Danish
    'da_DK': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: true
    },
    // Dutch
    'nl_NL': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: true
    },
    // English UK
    'en_GB': {
        decimalSep: '.',
        thousandsSep: ',',
        symbolSep: '',
        currencyFirst: true
    },
    // English AU
    'en_AU': {
        decimalSep: '.',
        thousandsSep: ',',
        symbolSep: '',
        currencyFirst: true
    },
    // Estonian
    'et_EE': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Finnish
    'fi_FI': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // French
    'fr_FR': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // German
    'de_DE': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: '',
        currencyFirst: false
    },
    // Greek
    'el_GR': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: '',
        currencyFirst: true
    },
    // Hungarian
    'hu_HU': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Italian
    'it_IT': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Latvian
    'lv_LV': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Lithuanian
    'lt_LT': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Norwegian
    'no_NO': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: true
    },
    // Peru-Spanish
    'es_PE': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Polish
    'pl_PL': {
        decimalSep: ',',
        thousandsSep: '',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Portuguese
    'pt_PT': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Romanian
    'ro_RO': {
        decimalSep: '.',
        thousandsSep: ',',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Russian
    'ru_RU': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Swedish
    'sv_SE': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Swiss-French
    'fr_CH': {
        decimalSep: ',',
        thousandsSep: ' ',
        symbolSep: ' ',
        currencyFirst: false
    },
    // Swiss-German
    'de_CH': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: '',
        currencyFirst: false
    },
    // Spanish
    'es_ES': {
        decimalSep: ',',
        thousandsSep: '.',
        symbolSep: ' ',
        currencyFirst: false
    }
};
const currencySymbols = {
    // Australian dollar
    AUD: '$',
    // Bulgarian Lev
    BGN: decodeURI('%D0%BB%D0%B2'),
    // Brazil Real
    BRL: 'R$',
    // Canada Dollar
    CAD: 'C$',
    // Swiss Franc
    CHF: 'CHF',
    // Czech Koruna
    CZK: decodeURI('K%C4%8D'),
    // Danish Krone
    DKK: 'kr',
    // Estonian Kroon
    EEK: 'kr',
    // Euro
    EUR: decodeURI('%E2%82%AC'),
    // Pound Sterling
    GBP: decodeURI('%C2%A3'),
    // Hungarian Forint
    HUF: 'Ft',
    // Croatian kuna
    HRK: 'Kn',
    // Lithuanian litas
    LTL: 'Lt',
    // Latvian Lats
    LVL: 'Ls',
    // Norwegian Krone
    NOK: 'kr',
    // Polish Zloty
    PLN: decodeURI('z%C5%82'),
    // Romainian Leu
    RON: 'RON',
    // Swedish Krona
    SEK: 'kr',
    // US Dollar
    USD: '$',
    // Indian Rupee
    INR: decodeURI('%E2%82%B9')
};

export const getFormatsByCustomerProfile = (customerProfile) => { // eslint-disable-line import/prefer-default-export, max-len
    let formating;
    if (locale in localeFormating) {
        formating = localeFormating[locale];
    } else {
        formating = localeFormating.fallback;
    }

    return {
        thousands: formating.thousandsSep,
        first: formating.currencyFirst,
        decimal: formating.decimalSep,
        separator: formating.symbolSep,
        currency: currencySymbols[customerProfile.currency]
    };
};

export const getCurrencySymbol = (currencyCode) => currencySymbols[currencyCode];

export const formatDate = (pIsoDate) => {
    const isoDate = new Date(Date.parse(pIsoDate));
    const year = isoDate.getFullYear();
    const month = (isoDate.getMonth() + 1) < 10 ? `0${isoDate.getMonth() + 1}` : isoDate.getMonth() + 1;
    const day = isoDate.getDate() < 10 ? `0${isoDate.getDate()}` : isoDate.getDate();
    const hours = isoDate.getHours() < 10 ? `0${isoDate.getHours()}` : isoDate.getHours();
    const minutes = isoDate.getMinutes() < 10 ? `0${isoDate.getMinutes()}` : isoDate.getMinutes();
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
