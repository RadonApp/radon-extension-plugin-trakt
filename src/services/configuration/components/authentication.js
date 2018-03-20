import IsNil from 'lodash-es/isNil';
import React from 'react';
import Runtime from 'wes/runtime';
import Uuid from 'uuid';

import Registry from 'neon-extension-framework/core/registry';
import {toCssUrl} from 'neon-extension-framework/core/helpers';
import {OptionComponent} from 'neon-extension-framework/services/configuration/components';

import Client from '../../../core/client';
import Log from '../../../core/logger';
import Plugin from '../../../core/plugin';
import './authentication.scss';


export default class AuthenticationComponent extends OptionComponent {
    constructor() {
        super();

        this.callbackId = null;
        this.callbackUrl = null;

        this.messaging = null;

        // Initial state
        this.state = {
            authenticated: false,
            subscribed: false,
            account: {}
        };
    }

    componentWillUnmount() {
        // Close messaging service
        if(!IsNil(this.messaging)) {
            this.messaging.close();
            this.messaging = null;
        }
    }

    componentWillMount() {
        // Retrieve messaging service
        this.messaging = Plugin.messaging.service('authentication');

        // Subscribe to service
        this.messaging.subscribe().then(
            () => this.setState({ subscribed: true }),
            () => this.setState({ subscribed: false })
        );

        // Retrieve account details
        Plugin.storage.getObject('account')
            .then((account) => {
                if(account === null) {
                    return;
                }

                this.setState({
                    authenticated: true,
                    account: account
                });
            });
    }

    onLoginClicked() {
        // Bind to callback event
        this.messaging.once('callback', this.onCallback.bind(this));

        // Generate callback id (to validate against received callback events)
        this.callbackId = Uuid.v4();

        // Generate callback url
        this.callbackUrl = Runtime.getURL(
            '/destination/trakt/callback/callback.html?id=' + this.callbackId
        );

        // Open authorization page
        window.open(Client['oauth'].authorizeUrl(this.callbackUrl), '_blank');
    }

    onCallback(query) {
        if(query.id !== this.callbackId) {
            Log.warn('Unable to authenticate with Last.fm: Invalid callback id');

            // Emit error event
            this.messaging.emit('error', {
                'title': 'Invalid callback id',
                'description': 'Please ensure you only click the "Login" button once.'
            });

            return;
        }

        // Exchange code for session
        Client['oauth'].exchange(query.code, this.callbackUrl).then((session) => {
            // Update authorization token
            return Plugin.storage.putObject('session', session)
                // Refresh account details
                .then(() => this.refresh())
                .then(() => {
                    // Emit success event
                    this.messaging.emit('success');
                });

        }, (error) => {
            Log.warn('Unable to authenticate with Trakt.tv: %s', error.message);

            // Emit error event
            this.messaging.emit('error', {
                'title': 'Unable to request authentication session',
                'description': error.message
            });
        });
    }

    refresh() {
        // Fetch account settings
        return Client['users']['settings'].get().then((account) => {
            // Update state
            this.setState({
                authenticated: true,
                account: account
            });

            // Update account settings
            Plugin.storage.putObject('account', account);

            return account;
        }, (body, statusCode) => {
            // Clear authorization
            return this.logout().then(() => {
                // Reject promise
                return Promise.reject(new Error(
                    'Unable to retrieve account settings, response with status code ' + statusCode + ' returned'
                ));
            });
        });
    }

    logout() {
        // Clear token and account details from storage
        return Plugin.storage.put('session', null)
            .then(() => Plugin.storage.put('account', null))
            .then(() => {
                // Update state
                this.setState({
                    authenticated: false,
                    account: {}
                });
            });
    }

    render() {
        if(this.state.authenticated) {
            // Logged in
            let account = this.state.account.account;
            let user = this.state.account.user;

            return (
                <div data-component={Plugin.id + ':authentication'} className="box active" style={{
                    backgroundImage: toCssUrl(account.cover_image)
                }}>
                    <div className="shadow"></div>

                    <div className="inner">
                        <div className="avatar" style={{
                            backgroundImage: toCssUrl(user.images.avatar.full)
                        }}/>

                        <div className="content">
                            <h3 className="title">{user.name || user.username}</h3>

                            <div className="actions">
                                <button
                                    type="button"
                                    className="button secondary small"
                                    onClick={this.refresh.bind(this)}>
                                    Refresh
                                </button>

                                <button
                                    type="button"
                                    className="button secondary small"
                                    onClick={this.logout.bind(this)}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Logged out
        return (
            <div data-component={Plugin.id + ':authentication'} className="box login">
                <div className="inner">
                    <button
                        type="button"
                        className="button small"
                        disabled={!this.state.subscribed}
                        onClick={this.onLoginClicked.bind(this)}>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}

AuthenticationComponent.componentId = Plugin.id + ':services.configuration:authentication';

// Register option component
Registry.registerComponent(AuthenticationComponent);
