export const baseEnvironment = {
    production: false,
    hmr: false,
    oauth: {
        redirectUri: window.location.origin + '/index.html',
        clientId: '',
        scope: 'profile email',
        loginUrl: 'https://forum.bioware.ru/oauth/authorize/',
        tokenEndpoint: 'https://forum.bioware.ru/oauth/token/',
        userinfoEndpoint: 'https://forum.bioware.ru/api/core/me/',
    },
    apiUrl: ''
};
