import React, {useState,useRef} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import  Library  from './components/Library';
import Nav from './components/nav';
import data from "./data";

function App() {
  //ref that we moved up from player.js
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data()); //returning all data in util
  const [currentSong, setCurrentSong] = useState(songs[0]);//first song object in util
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({//making state as an object
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
});
const [libraryStatus,setLibraryStatus] = useState(false);//be fault closed

  const timeUpdateHandler = (e) => {
    //update of song as time passes
    //we will use onTimeUpdate which is built in like onClick
    const current = e.target.currentTime;
    //target refers to audio that has current time and duration might be built in
    //that is why we can do target.currentTime and target.duration
    const duration = e.target.duration; //duration of the song

    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)
    //to get rounded percentage of where we are in song
    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage:animation})//update state

  }
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
    if(isPlaying) audioRef.current.play();
  }
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player 
      audioRef={audioRef} 
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong}  
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSong={setSongs} />

      <Library 
      audioRef={audioRef} 
      songs={songs} 
      setCurrentSong={setCurrentSong}
      isPlaying={isPlaying}
      setSongs={setSongs}
      libraryStatus={libraryStatus} />

      <audio 
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler}
            ref={audioRef} 
            src={currentSong.audio}
            onEnded={songEndHandler}></audio> 
    </div>
  );
}

export default App;
