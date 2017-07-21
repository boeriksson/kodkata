import context from 'context';
import Promise from 'promise-polyfill';

export const IOVATION_LOAD = 'IOVATION_LOAD';

/*eslint-disable */
window.io_enable_rip = true; // enable collection of Real IP
window.io_install_stm = false; // do not install Active X
window.io_exclude_stm = 12; // do not run Active X
window.io_install_flash = false; // do not install Flash
/*eslint-enable */

let iovationPromiseResolve;
const iovationTimeout = 10000; // ms until its ok to do deposit without iovation.
let iovationDone = false;

function iovationUpdate(bb, isDone) {
    if (isDone) {
        iovationDone = true;
        iovationPromiseResolve(bb);
    }
}

function addIovationScript() {
    window.io_bb_callback = iovationUpdate;
    const iovationScript = document.createElement('script');
    iovationScript.setAttribute('id', 'IovationScript');
    iovationScript.src = context.iovationURL;
    document.body.appendChild(iovationScript);
}

function iovationLoad(data) {
    return {
        type: IOVATION_LOAD,
        data
    };
}

function loadIovationScript(profile, timeout = iovationTimeout) {
    if (!profile.deviceTest || !context.iovationURL) { // Early exit if fraud service is turned off
        return iovationLoad(false);
    }
    return (dispatch) => {
        addIovationScript();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!iovationDone) {
                    dispatch(iovationLoad(false));
                    reject();
                }
            }, timeout);
            iovationPromiseResolve = resolve;
        }).then((data) => {
            dispatch(iovationLoad(data));
        });
    };
}

export default {
    loadIovationScript,
    iovationUpdate
};
