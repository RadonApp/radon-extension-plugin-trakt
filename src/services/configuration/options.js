import {
    Group,
    Page,
    EnableOption
} from 'neon-extension-framework/services/configuration/models';

import AuthenticationOption from './models/authentication';
import Plugin from '../../core/plugin';


export default [
    new Page(Plugin, null, Plugin.title, [
        new EnableOption(Plugin, 'enabled', 'Enabled', {
            default: false,

            type: 'plugin',
            permissions: true,
            contentScripts: true
        }),

        new AuthenticationOption(Plugin, 'authorization', 'Authentication', {
            requires: ['enabled']
        }),

        new Group(Plugin, 'scrobble', 'Scrobble', [
            new EnableOption(Plugin, 'enabled', 'Enabled', {
                default: true,
                requires: ['enabled'],

                type: 'service'
            })

            // new CheckboxOption(Plugin, 'movies', 'Movies', {
            //     default: true,
            //     requires: ['scrobble:enabled']
            // }),
            //
            // new CheckboxOption(Plugin, 'episodes', 'Episodes', {
            //     default: true,
            //     requires: ['scrobble:enabled']
            // }),
            //
            // new Group(Plugin, 'notifications', 'Notifications', [
            //     new EnableOption(Plugin, 'enabled', 'Enabled', {
            //         default: true,
            //         requires: ['scrobble:enabled']
            //     }),
            //
            //     new CheckboxOption(Plugin, 'started', 'Started', {
            //         default: false,
            //         requires: ['scrobble:enabled']
            //     }),
            //
            //     new CheckboxOption(Plugin, 'paused', 'Paused', {
            //         default: false,
            //         requires: ['scrobble:enabled']
            //     }),
            //
            //     new CheckboxOption(Plugin, 'scrobbled', 'Scrobbled', {
            //         default: true,
            //         requires: ['scrobble:enabled']
            //     }),
            //
            //     new CheckboxOption(Plugin, 'error', 'Error', {
            //         default: true,
            //         requires: ['scrobble:enabled']
            //     })
            // ])
        ])

        // new Group(Plugin, 'sync', 'Sync', [
        //     new EnableOption(Plugin, 'enabled', 'Enabled', {
        //         default: true,
        //         requires: ['enabled'],
        //
        //         type: 'service'
        //     }),
        //
        //     new CheckboxOption(Plugin, 'history', 'Watched history', {
        //         default: true,
        //         requires: ['sync:enabled']
        //     }),
        //
        //     new CheckboxOption(Plugin, 'ratings', 'Ratings', {
        //         default: true,
        //         requires: ['sync:enabled']
        //     })
        // ])
    ])
];
