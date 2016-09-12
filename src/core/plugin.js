import DestinationPlugin from 'eon.extension.framework/base/plugins/destination';


export class TraktPlugin extends DestinationPlugin {
    constructor() {
        super('trakt', 'Trakt.tv');
    }
}

export default new TraktPlugin();
