import Client from 'neon-extension-destination-trakt/Api/Client';
import Log from 'neon-extension-destination-trakt/Core/Logger';
import Plugin from 'neon-extension-destination-trakt/Core/Plugin';
import ScrobbleService from 'neon-extension-framework/Services/Destination/Scrobble';
import Registry from 'neon-extension-framework/Core/Registry';
import {MediaTypes} from 'neon-extension-framework/Core/Enums';
import {round} from 'neon-extension-framework/Utilities/Value';


export class Scrobble extends ScrobbleService {
    constructor() {
        super(Plugin, [
            MediaTypes.Video.Movie,
            MediaTypes.Video.Episode
        ]);
    }

    onStarted(session) {
        let item = this._buildMetadata(session.metadata);

        if(item === null) {
            Log.warn('Unable to build metadata for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].start(item, round(session.progress, 0)).then((body) => {
            Log.debug('TODO: Handle "start" action response:', body);
        }, (body, statusCode) => {
            Log.debug('TODO: Handle "start" action error, status code: %o, body: %O', statusCode, body);
        });
    }

    onSeeked(session) {
        return this.onStarted(session);
    }

    onPaused(session) {
        let item = this._buildMetadata(session.metadata);

        if(item === null) {
            Log.warn('Unable to build metadata for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].pause(item, round(session.progress, 0)).then((body) => {
            Log.debug('TODO: Handle "pause" action response:', body);
        }, (body, statusCode) => {
            Log.debug('TODO: Handle "pause" action error, status code: %o, body: %O', statusCode, body);
        });
    }

    onStopped(session) {
        let item = this._buildMetadata(session.metadata);

        if(item === null) {
            Log.warn('Unable to build metadata for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].stop(item, round(session.progress, 0)).then((body) => {
            Log.debug('TODO: Handle "stop" action response:', body);
        }, (body, statusCode) => {
            Log.debug('TODO: Handle "stop" action error, status code: %o, body: %O', statusCode, body);
        });
    }

    // region Private methods

    _buildMetadata(item) {
        let result = {};

        if(item.type.media === MediaTypes.Video.Movie) {
            // Movie
            result.movie = {
                title: item.title,
                year: item.year
            };
        } else if(item.type.media === MediaTypes.Video.Episode) {
            // Show
            result.show = {
                title: item.show.title
                // year
            };

            // Episode
            result.episode = {
                season: item.season.number,
                number: item.number,

                title: item.title
            };
        } else {
            return null;
        }

        return result;
    }

    // endregion
}

// Register service
Registry.registerService(new Scrobble());
