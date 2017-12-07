import IsNil from 'lodash-es/isNil';
import QueryString from 'querystring';

import PopupCallbackHandler from 'neon-extension-framework/popup/callback';

import Plugin from 'neon-extension-destination-trakt/core/plugin';


function process() {
    let handler = new PopupCallbackHandler(Plugin);

    // Ensure search parameters exist
    if(window.location.search.length < 2) {
        handler.reject('Invalid callback query');
        return;
    }

    // Decode query parameters
    let query = QueryString.decode(
        window.location.search.substring(1)
    );

    // Ensure authorization code is defined
    if(IsNil(query.code)) {
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
