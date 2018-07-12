import DestinationPlugin from '@radon-extension/framework/Models/Plugin/Destination';


export class TraktPlugin extends DestinationPlugin {
    constructor() {
        super('trakt');
    }
}

export default new TraktPlugin();
