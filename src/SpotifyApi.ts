//install query-string 'npm install query-string' in the frontend directory
import queryString from "query-string";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export const getAccessToken = async (): Promise<{ access_token: string }> => {
  const basic = Buffer.from(
    `${import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID}:${
      import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET
    }`
  ).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN,
    }),
  });
  return response.json();
};

export const getNowPlaying = async (): Promise<Response> => {
  const { access_token } = await getAccessToken();
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

interface Artist {
  name: string;
}

interface Album {
  images: AlbumImage[];
}

interface ExternalUrls {
  spotify: string;
}

interface SongItem {
  album: Album;
  artists: Artist[];
  external_urls: ExternalUrls;
  name: string;
}

interface NowPlayingData {
  is_playing: boolean;
  item: SongItem;
}

// return data
export default async function getNowPlayingItem() {
  const response = await getNowPlaying();
  if (response.status === 204 || response.status > 400) {
    return false;
  }
  const song: NowPlayingData = await response.json();

  const albumImageUrl = song.item?.album.images[0].url;
  const artist = song.item?.artists.map((_artist) => _artist.name).join(",");
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;

  return {
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  };
}
