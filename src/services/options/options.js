export default {
    enabled: {type: 'enable', label: 'Enabled'},

    scrobble: {
        enabled: {type: 'enable', label: 'Enabled'},

        position: {type: 'slider', label: 'Scrobble position'},
        retry: {type: 'checkbox', label: 'Retry failed scrobbles'},
    },

    sync: {
        enabled: {type: 'enable', label: 'Enabled'},

        loved: {type: 'checkbox', label: 'Synchronize loved tracks'}
    }
};
