/* global parent */
import context from 'context';

let origin = `${window.location.protocol}//${window.location.host}`; // require payment domain
const validParent = parent !== window;
const parensCssClass = 'canPostToParent';

if (validParent && document.body.className.indexOf(parensCssClass) < 0) {
    document.body.className += 'canPostToParent';
    document.body.className = document.body.className.trim();
}

if (!origin) {
    console.warn('No parent domain detected');
    origin = window.location.origin;
}

if (!validParent) {
    console.warn('window.parent === window wont post messages to parent.');
}

export default function (msg) {
    let message = msg;
    if (!validParent) {
        return;
    }
    // Just to make sure that the site and channel is never forgotten.
    if (typeof message === 'string') {
        message = JSON.parse(message);
    }
    message.site = context.clientId;
    message.channel = context.channel;

    parent.postMessage(JSON.stringify(message), '*');
}
