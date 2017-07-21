import {
    SERVER_STARTING,
    SERVER_STARTED
} from './devServerAction';

export default function devServerReducer(state = {
    servers: [
        {
            name: 'initial'
        }
    ],
    lastPort: 8080 // First port will be 8081, then 8082 etc
}, { type, method, theme, port }) {
    switch (type) {
        case SERVER_STARTING:
            return {
                ...state,
                servers: [
                    ...state.servers,
                    {
                        method,
                        theme,
                        port,
                        status: 'starting'
                    }
                ],
                lastPort: port
            };
        case SERVER_STARTED: {
            const ix = state.servers.findIndex((server) => server.method === method && server.theme === theme);
            const thePort = Math.max(state.lastPort, port);
            const servers = state.servers;
            servers[ix].port = thePort;
            servers[ix].status = 'started';
            return {
                ...state,
                servers,
                lastPort: thePort
            };
        }
        default:
            return state;
    }
}
