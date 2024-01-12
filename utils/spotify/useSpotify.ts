import { useEffect, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUPLIC_SPOTIFY_CLIENT_ID
const SECRET = process.env.NEXT_PUPLIC_SPOTIFY_SECRET

class Spotify {
  private accessToken: string | null = null;
  constructor(accessToken: string) {
    this.accessToken = accessToken;

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
}

export const useArtistSelector = (spotify: Spotify | undefined) => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArtistsByKeyword = async (keyword: string) => {
    setLoading(true)
    if (!spotify) return;
    const options = await spotify.getArtists(keyword);
    
    setCurrentOptions(options)
    setLoading(false)
  }

  return {
    loading,
    selectedArtists,
    setSelectedArtists,
    options: currentOptions,
    getArtistsByKeyword
  }
}

export const useSpotify = () => {
  const [loading, setLoading] = useState(true);
  const [spotify, setSpotify] = useState<Spotify | undefined>();

  useEffect(() => {
    (async () => {
      const authorizationToken = `${CLIENT_ID}:${SECRET}`
      console.log(authorizationToken)
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${new Buffer.from(authorizationToken).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      })

      const result = await response.json()
      console.log(result)
      setSpotify(new Spotify(result.access_token as string))
      setLoading(false)
    })();
  }, [])

  return {
    loading,
    spotify
  }
}