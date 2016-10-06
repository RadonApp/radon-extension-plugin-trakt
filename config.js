module.exports = {
    babel: {
        include: [
            'node_modules/@fuzeman/trakt/src'
        ]
    },
    children: [
        'callback'
    ],
    services: [
        'configuration',

        'destination/scrobble',
        'destination/sync'
    ]
};
