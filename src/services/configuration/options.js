import {
    CheckboxOption,
    EnableOption,
    Group
} from 'eon.extension.framework/services/configuration/models';

import TraktAuthenticationOption from './models/authentication';
import Plugin from '../../core/plugin';


export default [
    new EnableOption(Plugin, 'enabled', 'Enabled', {
        default: false
    }),

    new TraktAuthenticationOption(Plugin, 'authorization', 'Authentication', {
        requires: ['enabled']
    })
];
