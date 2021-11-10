import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs,libraryStatus}) =>{
    return(
        <div className={`library ${libraryStatus ? 'active-library': ''}`} >
            {/* if library status is true the add activelibrary class  */}
            <h2>Library</h2>
            <div className="library-songs">
            {/* in librarysong we will be mapping over all the songs in util and creating
            components for each one  this will display everything in util*/}
            {songs.map((song)=> (
            <LibrarySong 
            songs={songs} 
            setCurrentSong={setCurrentSong} 
            song={song} 
            id={song.id} 
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs} />
            // songs is all the songs and their info
            // song is each individual song that we are on and their info
            //we get song from this function
            ))}
            </div>
        </div>
    )
}

export default Library;