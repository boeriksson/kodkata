/* global window */
/* global navigator */
/* global location */
import log from './log';

export function logError(msg, url, line, col, state) {
    let message = '';
    if (navigator && navigator.userAgent) {
        message += ' // User-Agent: ' + navigator.userAgent;
    }
    if (line) {
        message += ' // Line: ' + line;
        if (col) {
            message += ':' + col;
        }
        if (url) {
            message += ' in ' + url;
        }
    }

    if (location && location.hash) {
        message += ' // SpaUrl: ' + location.hash;
    }
    message += ` // Component: ${config.module}`;
    message += ' // Error: ' + msg;

    if (state) {
        message += `// State: ${state}`;
    }

    let logger = log.error;

    // Change the logging level of the toString firefox error message
    if (navigator && navigator.userAgent && navigator.userAgent.match(/Firefox\//)) {
        if (msg.match(/toString/)) {
            logger = log.warn;
        } else if (msg.match(/href/)) {
            logger = log.warn;
        }
    }
    logger(message);
}

export default () => {
    // Do not log if using old internet explorer.
    let IEVersion = navigator.userAgent.match(/(?:MSIE )(\d*)/);
    if (IEVersion) {
        IEVersion = Number(IEVersion[1]);
    }
    if (IEVersion && IEVersion < 11) {
        return;
    }

    window.onerror = (msg, url, line, col) => { // This is only used before AuthContext is mounted
        logError(msg, url, line, col, null);
    };
};
