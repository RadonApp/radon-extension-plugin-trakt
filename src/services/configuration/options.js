import {
    Group,
    Page,
    CheckboxOption,
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
            new EnableOption(Plugin, 'scrobble:enabled', 'Enabled', {
                default: true,
                requires: ['enabled'],

                type: 'service'
            }),

            new CheckboxOption(Plugin, 'scrobble:movies', 'Movies', {
                default: true,
                requires: ['scrobble:enabled']
            }),

            new CheckboxOption(Plugin, 'scrobble:episodes', 'Episodes', {
                default: true,
                requires: ['scrobble:enabled']
            }),

            new Group(Plugin, 'scrobble:notifications', 'Notifications', [
                new EnableOption(Plugin, 'scrobble:notifications.enabled', 'Enabled', {
                    default: true,
                    requires: ['scrobble:enabled']
                }),

                new CheckboxOption(Plugin, 'scrobble:notifications.started', 'Started', {
                    default: false,
                    requires: ['scrobble:enabled']
                }),

                new CheckboxOption(Plugin, 'scrobble:notifications.paused', 'Paused', {
                    default: false,
                    requires: ['scrobble:enabled']
                }),

                new CheckboxOption(Plugin, 'scrobble:notifications.scrobbled', 'Scrobbled', {
                    default: true,
                    requires: ['scrobble:enabled']
                }),

                new CheckboxOption(Plugin, 'scrobble:notifications.error', 'Error', {
                    default: true,
                    requires: ['scrobble:enabled']
                })
            ])
        ]),

        new Group(Plugin, 'sync', 'Sync', [
            new EnableOption(Plugin, 'sync.enabled', 'Enabled', {
                default: true,
                requires: ['enabled'],

                type: 'service'
            }),

            new CheckboxOption(Plugin, 'sync.history', 'Watched history', {
                default: true,
                requires: ['sync.enabled']
            }),

            new CheckboxOption(Plugin, 'sync.ratings', 'Ratings', {
                default: true,
                requires: ['sync.enabled']
            })
        ])
    ])
];
