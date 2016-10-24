import PopupCallbackHandler from 'eon.extension.framework/popup/callback';
import {isDefined} from 'eon.extension.framework/core/helpers';

import querystring from 'querystring';

import Plugin from 'eon.extension.destination.trakt/core/plugin';


function process() {
    let handler = new PopupCallbackHandler(Plugin);

    // Ensure search parameters exist
    if(window.location.search.length < 2) {
        handler.reject('Invalid callback query');
        return;
    }

    // Decode query parameters
    let query = querystring.decode(
        window.location.search.substring(1)
    );

    // Ensure authorization code is defined
    if(!isDefined(query.code)) {
        handler.reject('Unable to retrieve authorization code');
        return;
    }

    // Resolve with authorization code
    handler.resolve(query.code);
}

// Process callback
try {
    process();
} catch(e) {
    console.error('Unable to process callback:', e.stack);
}
