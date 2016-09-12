import ScrobbleService from 'eon.extension.framework/base/services/destination/scrobble';
import Registry from 'eon.extension.framework/core/registry';

import Plugin from '../../core/plugin';


export class TraktScrobbleService extends ScrobbleService {
    constructor() {
        super(Plugin);
    }
}

// Register service
Registry.registerService(new TraktScrobbleService());
