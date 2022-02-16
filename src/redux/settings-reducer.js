const CHANGE_SETTINGS = 'settings-reducer/CHANGE_SETTINGS';

let initialState = {
    notificationSettings: {
        like: '2',
        comments: '2',
        subscriptionRequest: '1',
        reminders: '1',
        firstPublications: '1',
        supportRequests: '1',
    },
    editProfile: {
        editName: '',
        editUsername: '',
        editWebsite: '',
        editAboutSelf: '',
        editEmail: '',
        editPhoneNumber: '',
        editGender: '',
        recommendationSimilarAccounts: false
    },
    securitySettings: {
        accountPrivacy: false,
        onlineStatus: false,
    }
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS: 
            return {
                ...state,
                [action.settingsName]: action.settings
            }
        default:
            return state;
    }
}

export const changeSettings = (settings, settingsName) => {
    return {
        type: 'settings-reducer/CHANGE_SETTINGS',
        settings,
        settingsName,
    }
}

export default settingsReducer;