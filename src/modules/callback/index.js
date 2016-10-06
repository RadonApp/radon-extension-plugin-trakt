import MessagingBus from 'eon.extension.framework/messaging/bus';

import querystring from 'querystring';


function process() {
    // Connect to relay messaging bus
    let bus = new MessagingBus(window.name + '/callback').connect(
        'eon.extension.core:relay'
    );

    // Validate search parameters
    if(window.location.search.length < 2) {
        bus.relay(window.name, 'popup.reject', 'Missing search parameters');
        return;
    }

    // Decode query string
    let query = querystring.decode(window.location.search.substring(1));

    // Emit response event
    if(typeof query.code !== 'undefined') {
        bus.relay(window.name, 'popup.resolve', query.code);
    } else {
        bus.relay(window.name, 'popup.reject', 'Unable to retrieve code');
    }

    // Close window
    window.close();
}

// Process callback
try {
    process();
} catch(e) {
    console.error('Unable to process callback:', e.stack);
}
