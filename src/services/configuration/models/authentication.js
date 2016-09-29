import {PluginOption} from 'eon.extension.framework/services/configuration/models';

import AuthenticationComponent from '../components/authentication';


export default class AuthenticationOption extends PluginOption {
    constructor(plugin, key, label, options) {
        super(plugin, 'authentication', key, label, AuthenticationComponent, options);
    }
}
