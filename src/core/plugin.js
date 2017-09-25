import DestinationPlugin from 'neon-extension-framework/base/plugins/destination';

import Manifest from '../../manifest.json';


export class TraktPlugin extends DestinationPlugin {
    constructor() {
        super('trakt', Manifest);
    }
}

export default new TraktPlugin();
