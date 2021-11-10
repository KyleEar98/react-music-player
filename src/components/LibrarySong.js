import React from 'react';


const LibrarySong = ({song, setCurrentSong, songs, id, audioRef, isPlaying, setSongs}) => {
    const songsSelectHandler = async () =>{
        const selectedSong = songs.filter((state) => state.id === id);
        await setCurrentSong({ ...selectedSong[0] });
        //add an active state
        const newSongs = songs.map((song) => {
            if(song.id === id) {
                //id represents the song we click on
                //song.id represents the song in the state
                //if the song we clicked on is equal to the one in the state
                return{//return all song info but change active state to true
                    ...song,
                    active: true,
                }
            }
            else{
                    return{ 
                        //if it doesnt match the active sate on all the other ones should be false
                        ...song,
                        active: false,
                    }
                }
            });
            setSongs(newSongs);
            //pushing the new active state to Songs in util using setSongs
            if(isPlaying) audioRef.current.play();


       //set current song to the song that we clicked on using onClick
       //setCurrent song will then change in Song.js to whatever we click on
       if (isPlaying) {
           const playPromise = audioRef.current.play();
           if(playPromise !== undefined){ //if audio we clicked on is undefined (not laoded)
               playPromise.then((audio) => {//then wait a little
                //when the audio finally loads is when we want to play it
                   audioRef.current.play();
               })
           }
       }
       //after successfully getting audio ref by moving it to app
       //we are able to pass it to here and play the song after clicking one on the side
    }
    return(
        <div onClick={songsSelectHandler} 
        className={`library-song ${song.active ? 'selected' : ""}`}>
        {/* checking if song is true, if it is add selected state active is from util */}
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>

    )
}

export default LibrarySong;