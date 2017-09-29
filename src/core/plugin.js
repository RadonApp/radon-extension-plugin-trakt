import DestinationPlugin from 'neon-extension-framework/base/plugins/destination';


export class TraktPlugin extends DestinationPlugin {
    constructor() {
        super('trakt');
    }
}

export default new TraktPlugin();
