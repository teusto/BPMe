import { useCallback, useState } from "react";

interface Song {
    id: string;
    title: string;
    artist: string;
    bpm: number;
    genre?: string;
    duration: number;
}

const usePlaylistGenerator = () => {

    const [isGenerating, setIsGenerating] = useState(false);

    const generatePlaylist = useCallback(async (targetBPM: number, tolerance: number = 15): Promise<Song[]> => {
        setIsGenerating(true);

        //API CALL
        const songs = await fetch('https://api.deezer.com/genre/1000/tracks').then(res => res.json());

        const filteredSongs = songs.filter((song: Song) => Math.abs(song.bpm - targetBPM) <= tolerance);

        const sortedByBPM = filteredSongs.sort((a: Song, b: Song) => Math.abs(a.bpm - targetBPM) - Math.abs(b.bpm - targetBPM));

        setIsGenerating(false);
        return sortedByBPM.slice(0, 10);
    }, [])

    return {
        isGenerating,
        generatePlaylist
    }
};

export default usePlaylistGenerator;