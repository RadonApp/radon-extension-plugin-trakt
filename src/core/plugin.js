import DestinationPlugin from 'eon.extension.framework/base/plugins/destination';

import Manifest from '../../manifest.json';


export class TraktPlugin extends DestinationPlugin {
    constructor() {
        super('trakt', 'Trakt.tv', Manifest);
    }
}

export default new TraktPlugin();
