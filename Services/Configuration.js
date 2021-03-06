import ConfigurationService from '@radon-extension/framework/Services/Configuration';
import Registry from '@radon-extension/framework/Core/Registry';
import {Group, Page} from '@radon-extension/framework/Models/Configuration';
import {EnableOption} from '@radon-extension/framework/Models/Configuration/Options';

import Plugin from '../Core/Plugin';
import {AuthenticationOption} from '../Models/Configuration';


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
