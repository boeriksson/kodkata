import webApi from '../../common/utils/webApi';

const postLog = (type, message) => {
    const data = {
        'logLevel': type,
        'message': message
    };
    
    webApi.postJSON(`/${config.module}/external-api/log`, data)
        .catch((error) => {
            console.warn('Error logging: ', error);
        });
};

export default {
    error(message) {
        postLog('ERROR', message);
    },
    warn(message) {
        postLog('WARN', message);
    },
    info(message) {
        postLog('INFO', message);
    },
    debug(message) {
        postLog('DEBUG', message);
    }
};
