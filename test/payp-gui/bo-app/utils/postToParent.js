/* global window */
/* global parent */


var origin = window.location.protocol+"//"+window.location.host; //require payment domain
var validParent = parent !== window;

var log = {
    warn: () => {},
    error: () => {},
    info: () => {}
};

const parensCssClass = 'canPostToParent';

if (validParent && document.body.className.indexOf(parensCssClass) < 0) {
    document.body.className += " canPostToParent";
    document.body.className = document.body.className.trim();
}

if(!origin) {
    log.warn("No parent domain detected");
    origin = window.location.origin;
}

if(!validParent) {
    log.warn("window.parent === window wont post messages to parent.");
}

module.exports = function(message) {
    if (!validParent) {
        return;
    }
    // Just to make sure that the site and channel is never forgotten.
    if (typeof message === "string") {
        message = JSON.parse(message);
    }

    parent.postMessage(JSON.stringify(message), origin);
};
