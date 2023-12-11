import React from 'react';

class SteamProfileButton extends React.Component {
    redirectToSteamProfile = (steamID) => {
        const steamProfileURL = `https://steamcommunity.com/profiles/${steamID}`;
        window.location.href = steamProfileURL;
    };

    render() {
        const { steamID } = this.props;

        return (
            <button onClick={() => this.redirectToSteamProfile(steamID)}>
                Steam Profile
            </button>
        );
    }
}

export default SteamProfileButton;