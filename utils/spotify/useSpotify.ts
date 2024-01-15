import { IOption } from "@/app/(root)/events/create/SpotifySelect";
import { useEffect, useState } from "react";
import { MultiValue } from "react-select";
import Spotify from "./Spotify";


export const useArtistSelector = (spotify: Spotify | undefined) => {
  const [selectedArtists, setSelectedArtists] = useState<MultiValue<IOption>>([]);
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
      // const authorizationToken = `${CLIENT_ID}:${SECRET}`
      // console.log(authorizationToken)
      // const response = await fetch("https://accounts.spotify.com/api/token", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     Authorization: `Basic ${new Buffer.from(authorizationToken).toString("base64")}`,
      //   },
      //   body: "grant_type=client_credentials",
      // })

      // const result = await response.json()
      // console.log(result)
      // setSpotify(new Spotify(result.access_token as string))
      setSpotify(new Spotify());
      setLoading(false)
    })();
  }, [])

  return {
    loading,
    spotify
  }
}