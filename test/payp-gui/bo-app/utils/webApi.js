import context from 'context';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';

function ajax(url, method, data) {
    const options = {
        method,
        headers: {
            'Accept': 'application/hal+json',
            'Content-Type': 'application/json',
            'UB-Pay-Client-Identifier': context.clientId,
            'UB-Pay-Client-Channel': context.channel,
            'UB-Pay-Client-Locale': context.locale,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        credentials: 'include'
    };
    if (context.ctx) {
        options.headers['UB-Pay-Client-CTX'] = context.ctx;
    }
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    return fetch(url, options)
        .then((response) => {
            if (response.ok) {
                return response;
            }
            return response.json().then((json) => Promise.reject(json));
        })
        .then((response) => response.json())
        .catch((error) => {
            if (error.redirectUrl) {
                window.location.href = error.redirectUrl;
            }
            return Promise.reject(error);
        });
}

export default {
    postJSON(url, data) {
        return ajax(url, 'POST', data);
    },
    
    putJSON(url, data) {
        return ajax(url, 'PUT', data);
    },
    
    getJSON(url) {
        return ajax(url, 'GET');
    },
    
    delJSON(url) {
        return ajax(url, 'DELETE');
    }
};
