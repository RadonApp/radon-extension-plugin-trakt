import Storage from 'eon.extension.browser/storage';

import {Client} from '@fuzeman/trakt/src';

import Plugin from './plugin';


const Key = 'c8213aa5317b9a246b34edc7d79206e9a7ac9876ba28dcab8671d0b59ad67b77';
const Secret = 'fcdc46e6c512cb618ca287fe0367be7ed47362cb5996af10c6aaafd58b2de4ef';

export default new Client(Key, Secret, {
    application: {
        name: 'Eon',
        version: 'dev'
    },
    session: () => {
        return Storage.getObject(Plugin.id + ':session');
    },
    onSessionRefreshed: (session) => {
        return Storage.put(Plugin.id + ':session', session);
    }
});
