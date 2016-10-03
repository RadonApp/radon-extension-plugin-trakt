module.exports = {
    babel: {
        include: [
            'node_modules/@fuzeman/trakt/src'
        ]
    },
    services: [
        'configuration',

        'destination/scrobble',
        'destination/sync'
    ]
};
