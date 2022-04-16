const config = {
    redirectUrl: 'com.myapp://oauth2redirect/reddit',
    clientId: 'E5IlS_CLGtaZVlxOm3Vyig',
    clientSecret: '',
    scopes: ['identity', 'edit', 'flair', 'history', 'modconfig', 'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
        tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
    customHeaders: {
        token: {
            Authorization: 'Basic RTVJbFNfQ0xHdGFaVmx4T20zVnlpZw==',
        },
    },
}

export { config }

const loginReddit = async () => {
    try {
        console.log(config)
        const authState = await prefetchConfiguration(config);
        let token = JSON.stringify(authState.accessToken);
        await AsyncStorage.setItem("access_token", token);
    } catch (error) {
        console.log(error);
    }
}

export { loginReddit }