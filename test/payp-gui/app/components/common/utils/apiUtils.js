import Promise from 'promise-polyfill';

function ajax(url, method, data) {
    const options = {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

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
