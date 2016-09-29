import {Storage} from 'eon.extension.browser';

import Trakt from '@fuzeman/trakt/src/trakt.js';

import Plugin from './plugin';


var Client = new Trakt.Client();
Client.id = 'c8213aa5317b9a246b34edc7d79206e9a7ac9876ba28dcab8671d0b59ad67b77';
Client.secret = 'fcdc46e6c512cb618ca287fe0367be7ed47362cb5996af10c6aaafd58b2de4ef';

// Retrieve account token
Client.ready = Storage.getObject(Plugin.id + ':token')
    .then((authorization) => {
        // Update client authorization
        Client.authorization = authorization;
    });

export default Client;
