// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getInt} from 'mattermost-redux/selectors/entities/preferences';
import {getCurrentChannel, getDirectTeammate} from 'mattermost-redux/selectors/entities/channels';
import {getMyChannelRoles} from 'mattermost-redux/selectors/entities/roles';
import {getRoles} from 'mattermost-redux/selectors/entities/roles_helpers';
import {getCurrentUserId} from 'mattermost-redux/selectors/entities/users';
import {getConfig, getLicense} from 'mattermost-redux/selectors/entities/general';

import {getProfiles} from 'mattermost-redux/actions/users';

import {Action, ActionFunc, GenericAction} from 'mattermost-redux/types/actions';

import {TutorialSteps, Preferences} from 'utils/constants';

import {goToLastViewedChannel} from 'actions/views/channel';

import {setShowNextStepsView} from 'actions/views/next_steps';

import {isOnboardingHidden, showNextSteps, showNextStepsTips} from 'components/next_steps_view/steps';
import {GlobalState} from 'types/store';

import ChannelView from './channel_view';

type Actions = {
    goToLastViewedChannel: () => Promise<{data: boolean}>;
    setShowNextStepsView: (show: boolean) => Action;
    getProfiles: (page?: number, perPage?: number, options?: Record<string, string | boolean>) => ActionFunc;
}

function isDeactivatedChannel(state: GlobalState, channelId: string) {
    const teammate = getDirectTeammate(state, channelId);

    return Boolean(teammate && teammate.delete_at);
}

function mapStateToProps(state: GlobalState) {
    const channel = getCurrentChannel(state);

    const config = getConfig(state);

    // This stops the tutorial from showing since we now have onboarding flow screens. using config.EnableTutorial this can be toggled.
    const enableTutorial = false;
    const tutorialStep = getInt(state, Preferences.TUTORIAL_STEP, getCurrentUserId(state), TutorialSteps.FINISHED);
    const viewArchivedChannels = config.ExperimentalViewArchivedChannels === 'true';

    let channelRolesLoading = true;
    if (channel && channel.id) {
        const roles = getRoles(state);
        const myChannelRoles = getMyChannelRoles(state);
        if (myChannelRoles[channel.id]) {
            const channelRoles = myChannelRoles[channel.id].values();
            for (const roleName of channelRoles) {
                if (roles[roleName]) {
                    channelRolesLoading = false;
                }
                break;
            }
        }
    }

    return {
        channelId: channel ? channel.id : '',
        channelRolesLoading,
        deactivatedChannel: channel ? isDeactivatedChannel(state, channel.id) : false,
        focusedPostId: state.views.channel.focusedPostId,
        showTutorial: enableTutorial && tutorialStep <= TutorialSteps.INTRO_SCREENS,
        showNextSteps: showNextSteps(state),
        showNextStepsTips: showNextStepsTips(state),
        isOnboardingHidden: isOnboardingHidden(state),
        showNextStepsEphemeral: state.views.nextSteps.show,
        channelIsArchived: channel ? channel.delete_at !== 0 : false,
        viewArchivedChannels,
        isCloud: getLicense(state).Cloud === 'true',
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc|GenericAction>, Actions>({
            setShowNextStepsView,
            goToLastViewedChannel,
            getProfiles,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelView));
