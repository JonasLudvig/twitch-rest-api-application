"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Channel {
    constructor(displayNameInput, imageInput) {
        this.displayName = displayNameInput;
        this.image = imageInput;
    }
}
class Stream {
    constructor(viewerCountInput, gameInput) {
        this.viewerCount = viewerCountInput;
        this.game = gameInput;
    }
}
let sidePanel = document.querySelector('.side-panel-js');
let sidePanelList = document.querySelector('.side-panel-list-js');
let twitchEmbed = document.getElementById('twitch-embed');
let channels = [];
let streams = [];
getUsersAndStreams();
function getUsersAndStreams() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://qsdlr.org/twitch-rest-api/get-user?27446517&id=31239503&id=19070311&id=26301881');
        const user = yield response.json();
        const array = JSON.parse(user);
        const responseStream = yield fetch('https://qsdlr.org/twitch-rest-api/get-stream?27446517&user_id=31239503&user_id=19070311&user_id=26301881');
        const userStream = yield responseStream.json();
        const arrayStream = JSON.parse(userStream);
        array.data.forEach((user) => {
            const button = document.createElement('button');
            button.classList.add(user.id);
            button.classList.add('button');
            if (sidePanelList !== null) {
                sidePanelList.appendChild(button);
            }
            const entryContainer = document.createElement('div');
            entryContainer.classList.add('entry-container');
            button.appendChild(entryContainer);
            const entryLeft = document.createElement('div');
            const entryRight = document.createElement('div');
            entryContainer.appendChild(entryLeft);
            entryContainer.appendChild(entryRight);
            const displayName = document.createElement('h2');
            displayName.innerText = user.display_name;
            entryRight.appendChild(displayName);
            const image = document.createElement('img');
            image.src = user.profile_image_url;
            image.classList.add('profile-pic');
            entryLeft.appendChild(image);
            button.addEventListener('click', function () {
                if (twitchEmbed !== null) {
                    twitchEmbed.innerHTML = '';
                }
                const stream = new Twitch.Embed('twitch-embed', {
                    width: '90%',
                    height: 500,
                    muted: true,
                    channel: user.display_name,
                });
            });
            channels.push(new Channel(user.display_name, user.profile_image_url));
            arrayStream.data.forEach((stream) => {
                if (stream.user_id == user.id) {
                    const streamLive = document.createElement('p');
                    streamLive.innerText = 'Live! ' + stream.viewer_count + ' viewers';
                    entryRight.appendChild(streamLive);
                    const gameName = document.createElement('p');
                    gameName.innerText = stream.game_name;
                    entryRight.appendChild(gameName);
                    streams.push(new Stream(parseInt(stream.viewer_count), stream.game_name));
                }
            });
        });
    });
}
//# sourceMappingURL=app.js.map