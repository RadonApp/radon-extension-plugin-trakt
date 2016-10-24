import {PluginOption} from 'eon.extension.framework/services/configuration/models';

import merge from 'lodash-es/merge';


export default class AuthenticationOption extends PluginOption {
    constructor(plugin, key, label, options) {
        super(plugin, 'authentication', key, label, merge({
            componentId: 'services.configuration:authentication'
        }, options));
    }
}
