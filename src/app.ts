class Channel {
  displayName!: String;
  image!: String;

  constructor(displayNameInput: string, imageInput: string) {
    this.displayName = displayNameInput;
    this.image = imageInput;
  }
}

class Stream {
  viewerCount!: Number;
  game!: String;

  constructor(viewerCountInput: number, gameInput: string) {
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

async function getUsersAndStreams() {
  const response = await fetch(
    'https://qsdlr.org/twitch-rest-api/get-user?27446517&id=31239503&id=19070311&id=26301881'
  );
  const user = await response.json();
  const array = JSON.parse(user);

  const responseStream = await fetch(
    'https://qsdlr.org/twitch-rest-api/get-stream?27446517&user_id=31239503&user_id=19070311&user_id=26301881'
  );
  const userStream = await responseStream.json();
  const arrayStream = JSON.parse(userStream);

  array.data.forEach(
    (user: { id: string; display_name: string; profile_image_url: string }) => {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const stream = new Twitch.Embed('twitch-embed', {
          width: '90%',
          height: 500,
          muted: true,
          channel: user.display_name,
        });
      });

      channels.push(new Channel(user.display_name, user.profile_image_url));

      arrayStream.data.forEach(
        (stream: {
          user_id: string;
          viewer_count: string;
          game_name: string;
        }) => {
          if (stream.user_id == user.id) {
            const streamLive = document.createElement('p');
            streamLive.innerText = 'Live! ' + stream.viewer_count + ' viewers';
            entryRight.appendChild(streamLive);

            const gameName = document.createElement('p');
            gameName.innerText = stream.game_name;
            entryRight.appendChild(gameName);

            streams.push(
              new Stream(parseInt(stream.viewer_count), stream.game_name)
            );
          }
        }
      );
    }
  );
}
