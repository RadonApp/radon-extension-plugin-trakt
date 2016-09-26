import {MediaTypes} from 'eon.extension.framework/core/enums';
import Registry from 'eon.extension.framework/core/registry';
import ScrobbleService from 'eon.extension.framework/services/destination/scrobble';

import Client from '../../core/client';
import Plugin from '../../core/plugin';


export class TraktScrobbleService extends ScrobbleService {
    constructor() {
        super(Plugin, [
            MediaTypes.Video.Movie,
            MediaTypes.Video.Episode
        ]);
    }

    onStarted(session) {
        // Build request
        var request = this._buildRequest(session, session.item);

        if(request === null) {
            console.warn('Unable to build request for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].start(request).then((body) => {
            console.debug('TODO: Handle "start" action response:', body);
        }, (body, statusCode) => {
            console.debug('TODO: Handle "start" action error, status code: %o, body: %O', statusCode, body);
        });
    }

    onPaused(session) {
        // Build request
        var request = this._buildRequest(session, session.item);

        if(request === null) {
            console.warn('Unable to build request for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].pause(request).then((body) => {
            console.debug('TODO: Handle "pause" action response:', body);
        }, (body, statusCode) => {
            console.debug('TODO: Handle "pause" action error, status code: %o, body: %O', statusCode, body);
        });
    }

    onEnded(session) {
        // Build request
        var request = this._buildRequest(session, session.item);

        if(request === null) {
            console.warn('Unable to build request for session:', session);
            return;
        }

        // Send action
        Client['scrobble'].stop(request).then((body) => {
            console.debug('TODO: Handle "stop" action response:', body);
        }, (body, statusCode) => {
            console.debug('TODO: Handle "stop" action error, status code: %o, body: %O', statusCode, body);
        });
    }

    // region Private methods

    _buildRequest(session, item) {
        var request = {};

        // Metadata
        if(item.type.media === MediaTypes.Video.Movie) {
            // Movie
            request.movie = {
                title: item.title,
                year: item.year
            };
        } else if(item.type.media === MediaTypes.Video.Episode) {
            // Show
            request.show = {
                title: item.show.title,
                // year
            };

            // Episode
            request.episode = {
                season: item.season.number,
                number: item.number,

                title: item.title
            };
        } else {
            return null;
        }

        // Session
        request.progress = session.progress * 100;

        // Application
        request.app_version = "0.1";
        request.app_date = "dev";

        return request;
    }

    // endregion
}

// Register service
Registry.registerService(new TraktScrobbleService());
