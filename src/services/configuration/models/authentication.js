import {PluginOption} from 'eon.extension.framework/services/configuration/models';

import TraktAuthenticationComponent from '../components/authentication';


export default class TraktAuthenticationOption extends PluginOption {
    constructor(plugin, key, label, options) {
        super(plugin, 'authentication', key, label, TraktAuthenticationComponent, options);
    }
}
