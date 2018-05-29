import DestinationPlugin from 'neon-extension-framework/Models/Plugin/Destination';


export class TraktPlugin extends DestinationPlugin {
    constructor() {
        super('trakt');
    }
}

export default new TraktPlugin();
