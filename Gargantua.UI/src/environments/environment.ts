export const environment = {
    production: false,
    
    baseApi: 'https://localhost:7242',
    baseUi: 'http://localhost:4200',

    authority: '',
    clientId: '',

    scopes: 'openid profile offline_access',

    loginRoute: ['auth', 'login'],
    homeRoute: ['home'],
};
