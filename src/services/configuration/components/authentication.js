import Extension from 'neon-extension-browser/extension';
import Storage from 'neon-extension-browser/storage';
import Popup from 'neon-extension-framework/popup';
import Registry from 'neon-extension-framework/core/registry';
import {isDefined, toCssUrl} from 'neon-extension-framework/core/helpers';
import {OptionComponent} from 'neon-extension-framework/services/configuration/components';

import React from 'react';
import uuid from 'uuid';

import Client from '../../../core/client';
import Plugin from '../../../core/plugin';
import './authentication.scss';


export default class AuthenticationComponent extends OptionComponent {
    constructor() {
        super();

        this.popup = null;

        this.state = {
            authenticated: false,
            account: {}
        };
    }

    componentWillMount() {
        // Ensure previous popup has been disposed
        this.disposePopup();

        // Retrieve account details
        Storage.getObject(Plugin.id + ':account')
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

    disposePopup() {
        if(!isDefined(this.popup)) {
            return;
        }

        // Dispose popup (close window, disconnect messaging channel)
        try {
            this.popup.dispose();
        } catch(e) {
            console.warn('Unable to dispose popup:', e.stack);
        }

        // Clear state
        this.popup = null;
    }

    onLoginClicked() {
        let popupId = uuid.v4();

        // Build callback url
        let callbackUrl = Extension.getCallbackUrl(
            '/destination/trakt/callback/callback.html'
        );

        // Build authorize url
        let authorizeUrl = Client['oauth'].authorizeUrl(callbackUrl);

        // Ensure previous popup has been disposed
        this.disposePopup();

        // Create popup
        this.popup = Popup.create(authorizeUrl, {
            id: popupId,

            location: 0,
            status: 0,
            toolbar: 0,

            position: 'center',
            width: 450,
            height: 450,

            offsetTop: 100
        });

        // Store latest popup id as fallback (for Firefox)
        Storage.putString(Plugin.id + ':authentication.latestPopupId', popupId).then(() => {
            // Open authorize popup
            this.popup.open()
                .then((code) => Client['oauth'].exchange(code, callbackUrl))
                .then((session) => {
                    // Update authorization token
                    return Storage.putObject(Plugin.id + ':session', session).then(() => {
                        // Refresh account
                        return this.refresh();
                    });
                }, (error) => {
                    console.warn('Unable to authenticate with trakt.tv, error:', error.message);
                });
        });
    }

    refresh() {
        // Fetch account settings
        Client['users']['settings'].get().then((account) => {
            // Update state
            this.setState({
                authenticated: true,
                account: account
            });

            // Update account settings
            Storage.putObject(Plugin.id + ':account', account);

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
        return Storage.put(Plugin.id + ':session', null)
            .then(() => Storage.put(Plugin.id + ':account', null))
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
                    <button type="button" className="button small" onClick={this.onLoginClicked.bind(this)}>
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
