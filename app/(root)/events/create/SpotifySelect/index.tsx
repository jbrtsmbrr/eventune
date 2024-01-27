import Select from "react-select";
import { useArtistSelector } from '@/utils/spotify/useSpotify'
import { debounce } from "@/utils/debounce";
import SpotifyOption from "./Option";
import SpotifyMultiValueContainer from "./MultiValueContainer";

export interface IOption { id: string, name: string, followers: { total: number }, images: Record<any, any>[] }

const SpotifyArtistSelect = ({ value, onChange }) => {
  const { loading: loadingOptions, options, getArtistsByKeyword } = useArtistSelector();

  const handleSelectChange = (newValue: string) => {
    if (newValue.length <= 0) return;
    getArtistsByKeyword(newValue)
  }

  return <Select
    className="min-w-80"
    // classNamePrefix="spotify--menu"
    isMulti
    // value={selectedArtists}
    value={value}
    options={options}
    isOptionSelected={(option, selectedValues) => selectedValues.some(selected => option.name === selected.name) }
    getOptionLabel={option => option?.name}
    isLoading={loadingOptions}
    onInputChange={debounce(handleSelectChange, 500)}
    loadingMessage={() => 'Loading...'}
    placeholder="Search artist..."
    onChange={(newSelectedArtists, { option: newSelectedArtist }) => {
      onChange([...value, { ...newSelectedArtist, artistSpotifyId: newSelectedArtist?.id }])
      // setSelectedArtists(newSelectedArtists)
    }}
    classNames={{
      placeholder: () => "text-sm text-gray-400 ",
      control: () => "!bg-transparent !border-none focus-visible:!ring-0 focus-visible:!ring-offset-0",
      input: () => "text-sm bg-transparent  !border-none focus-visible:ring-0 focus-visible:ring-offset-0 !text-gray-300 outline-0 p-0 h-[3ch]",
      container: () => "!border-none !focus-visible:ring-0 !focus-visible:ring-offset-0 !outline-0",
      valueContainer: () => "max-w-[500px]"

    }}
    components={{
      Option: SpotifyOption,
      MultiValueContainer: (multiValueState, _) => {
        return <SpotifyMultiValueContainer multiValueState={multiValueState} onDelete={() => {
          const prevArtistsCopy = [...value]
            const index = prevArtistsCopy.findIndex((opt: any) => {
              return opt.id as string === multiValueState.data.id as string
            })

            prevArtistsCopy.splice(index, 1)

            onChange(prevArtistsCopy)

          // setSelectedArtists((prevArtists) => {
          //   const prevArtistsCopy = [...prevArtists]
          //   const index = prevArtistsCopy.findIndex((opt: any) => {

          //     console.log(opt.id)
          //     console.log(multiValueState.data.id)
          //     return opt.id as string === multiValueState.data.id as string
          //   })

          //   prevArtistsCopy.splice(index, 1)

          //   return prevArtistsCopy
          // })
        }} />
      },
      // MultiValueRemove: (props) => {
      //   props.innerProps.onClick = () => {
      //     setSelectedArtists((prevArtists) => {
      //       const prevArtistsCopy = [...prevArtists]
      //       const index = prevArtistsCopy.findIndex((opt: any) => opt.id as string === props.data.id as string)

      //       prevArtists.splice(index, 1)

      //       return prevArtistsCopy
      //     })
      //   }
      //   return <components.MultiValueRemove {...props}>x</components.MultiValueRemove>
      // }
    }}
  />
}

export default SpotifyArtistSelect;