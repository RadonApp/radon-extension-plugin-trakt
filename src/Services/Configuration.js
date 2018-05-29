import ConfigurationService from 'neon-extension-framework/Services/Configuration';
import Registry from 'neon-extension-framework/Core/Registry';
import {Group, Page} from 'neon-extension-framework/Models/Configuration';
import {EnableOption} from 'neon-extension-framework/Models/Configuration/Options';
import Plugin from 'neon-extension-destination-trakt/Core/Plugin';
import {AuthenticationOption} from 'neon-extension-destination-trakt/Models/Configuration';


export const Options = [
    new Page(Plugin, null, [
        new EnableOption(Plugin, 'enabled', {
            default: false,

            type: 'plugin',
            permissions: true,
            contentScripts: true
        }),

        new AuthenticationOption(Plugin, 'authorization', {
            requires: ['enabled']
        }),

        new Group(Plugin, 'scrobble', [
            new EnableOption(Plugin, 'enabled', {
                default: true,
                requires: ['enabled'],

                type: 'service'
            })
        ])
    ])
];

export class TraktConfigurationService extends ConfigurationService {
    constructor() {
        super(Plugin, Options);
    }
}

// Register service
Registry.registerService(new TraktConfigurationService());
