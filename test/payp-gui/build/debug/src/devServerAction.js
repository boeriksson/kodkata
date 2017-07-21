export const SERVER_STARTING = 'SERVER_STARTING';
export const SERVER_STARTED = 'SERVER_STARTED';

function startServer(method, theme) {
    return (dispatch, getState) => {
        const suggestedPort = getState().devServers.lastPort + 1;
        dispatch({
            type: SERVER_STARTING,
            method,
            theme,
            port: suggestedPort
        });

        fetch(`/startserver?port=${suggestedPort}&method=${method}&theme=${theme}`).then((resp) => resp.json()).then((data) => {
            console.log('data: ', data);
            dispatch({
                type: SERVER_STARTED,
                method,
                theme,
                port: data.port
            });
        });
    };
}

export default {
    startServer
};
