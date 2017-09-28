import DestinationPlugin from 'neon-extension-framework/base/plugins/destination';

import Manifest from '../../module.json';


export class TraktPlugin extends DestinationPlugin {
    constructor() {
        super('trakt', Manifest);
    }
}

export default new TraktPlugin();
