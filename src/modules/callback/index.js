import Storage from 'eon.extension.browser/storage';

import MessagingBus from 'eon.extension.framework/messaging/bus';

import querystring from 'querystring';

import Plugin from '../../core/plugin';


function getCallbackId() {
    if(window.name !== '') {
        return Promise.resolve(window.name);
    }

    return Storage.getString(Plugin.id + ':authentication.latestPopupId')
        .then((callbackId) =>
            'eon.popup/' + callbackId
        );
}

function sendResponse(callbackId, code) {
    return new Promise((resolve) => {
        // Connect to relay messaging bus
        let bus = new MessagingBus(callbackId + '/callback').connect(
            'eon.extension.core:relay'
        );

        // Emit response event
        if(typeof code !== 'undefined') {
            bus.relay(callbackId, 'popup.resolve', code);
        } else {
            bus.relay(callbackId, 'popup.reject', 'Unable to retrieve code');
        }

        // Disconnect messaging bus
        bus.disconnectAll();

        resolve();
    });
}

function process() {
    // Validate search parameters
    if(window.location.search.length < 2) {
        console.error('Missing search parameters');
        return;
    }

    // Decode query parameters
    let query = querystring.decode(
        window.location.search.substring(1)
    );

    // Send token to configuration page
    getCallbackId().then((callbackId) => {
        sendResponse(callbackId, query.code);
    }).then(() => {
        window.close();
    });
}

// Process callback
try {
    process();
} catch(e) {
    console.error('Unable to process callback:', e.stack);
}
