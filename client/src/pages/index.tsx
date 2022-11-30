import { lazy } from 'react';

export const HomePage = lazy(() => import('./home'));
export const TwitchLoginPage = lazy(() => import('./twitch-login'));
export const TwitchRedirectPage = lazy(() => import('./twitch-redirect'));
export const TwitchStreamPage = lazy(() => import('./twitch-stream'));
