const CLIENT_ID = process.env.NEXT_PUPLIC_SPOTIFY_CLIENT_ID
const SECRET = process.env.NEXT_PUPLIC_SPOTIFY_SECRET

export interface IArtistRaw {
  external_urls: { spotify: string }
  followers: { total: number },
  genres: string[],
  href: string,
  id: string,
  images: [{ url: string }],
  name: string,
  popularity: number,
  type: string,
  uri: string
}

export class Spotify {
  private accessToken: string | null = null;
  constructor() {
    // this.initializeAccessToken();
  }

  async initializeAccessToken() {
    const authorizationToken = `${CLIENT_ID}:${SECRET}`
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${new Buffer.from(authorizationToken).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
      cache: "no-store"
    })

    const result = await response.json()
    this.accessToken = result.access_token as string;
    return this
  }

  async getArtists(keyword = "") {
    if (keyword.length <= 0) return []

    const response = await fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=artist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      }
    })

    const result = await response.json();
    return result.artists.items;
  }

  async getArtistById(spotifyArtistId: string) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${spotifyArtistId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      }
    })
    const result: IArtistRaw = await response.json();
    return result;
  }
}

export default Spotify