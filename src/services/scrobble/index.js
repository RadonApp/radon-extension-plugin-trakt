import {MediaTypes} from 'eon.extension.framework/core/enums';
import Registry from 'eon.extension.framework/core/registry';
import ScrobbleService from 'eon.extension.framework/services/destination/scrobble';

import Client from '../../core/client';
import Plugin from '../../core/plugin';


export class Scrobble extends ScrobbleService {
    constructor() {
        super(Plugin, [
            MediaTypes.Video.Movie,
            MediaTypes.Video.Episode
        ]);
    }

    onStarted(session) {
        var item = this._buildMetadata(session.item);

        if(item === null) {
            console.warn('Unable to build metadata for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].start(item, session.progress * 100).then((body) => {
            console.debug('TODO: Handle "start" action response:', body);
        }, (body, statusCode) => {
            console.debug('TODO: Handle "start" action error, status code: %o, body: %O', statusCode, body);
        });
    }

    onPaused(session) {
        var item = this._buildMetadata(session.item);

        if(item === null) {
            console.warn('Unable to build metadata for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].pause(item, session.progress * 100).then((body) => {
            console.debug('TODO: Handle "pause" action response:', body);
        }, (body, statusCode) => {
            console.debug('TODO: Handle "pause" action error, status code: %o, body: %O', statusCode, body);
        });
    }

    onEnded(session) {
        var item = this._buildMetadata(session.item);

        if(item === null) {
            console.warn('Unable to build metadata for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].stop(item, session.progress * 100).then((body) => {
            console.debug('TODO: Handle "stop" action response:', body);
        }, (body, statusCode) => {
            console.debug('TODO: Handle "stop" action error, status code: %o, body: %O', statusCode, body);
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
