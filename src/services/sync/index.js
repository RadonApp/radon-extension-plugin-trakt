import SyncService from 'eon.extension.framework/services/destination/sync';
import Registry from 'eon.extension.framework/core/registry';

import Plugin from '../../core/plugin';


export class TraktSyncService extends SyncService {
    constructor() {
        super(Plugin);
    }
}

// Register service
Registry.registerService(new TraktSyncService());
