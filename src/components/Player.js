import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlay, faPause} from '@fortawesome/free-solid-svg-icons';


const Player = ({audioRef,
    currentSong, 
    isPlaying, 
    setIsPlaying,
    songs, 
    setSongInfo, 
    songInfo,
    setCurrentSong,
    setSongs}) => {
    //we have to pass isplaying and setisplaying from util.js to pause
    //useref is used for somethign like selecting a specific html tag in your component
    //below grabs current audio by setting ref = to it
    // -->const audioRef = useRef(null);
    //we are moving the audio ref above to app bc we want to fix error
    //we want to make is so when we click a song on the left it will play right away 
    //so we need the audioref

    
   const activeLibraryHandler = (nextPrev) =>{
       
        const newSongs = songs.map((song) => {
        if(song.id === nextPrev.id) {
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
                  };
                }
              });
          
              setSongs(newSongs);
            };
    const playSongHandler = () =>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying); //change to what is isnt
            //the true and false in data
        
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const getTime = (time) =>{
        //time will be currentTime or duration where we format it nicely
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
          );

    }
    const dragHandler = (e) => {
        //when we move slider this function will activate
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
        //update state to where we are dragging our slider
    }

    const skipTrackHandler = async (direction) => {
    //we want to find where we are (first, second song, etc.. 
    //and find what song is next and before)
    //we will be using indexes to find out where we are and which song were on
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    //if songid matches current song id then we are on that song
        if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
            //wait for this action to finish then play current song at setCurrentSong(songs[()])
            //if we are one 1 and want to go next we need to go to index 2 so we add 1
            //we need a way to go back to the beginning when reaching the last song
            //songs length is 7 and we want to wait for index to get to 7
            //once index gets to 7 it will go back to 0 on the next click
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction === 'skip-back'){
            if((currentIndex-1) % songs.length === -1){
            //we have to check for -1 which is going back while on the first index of 0
            //so if we have that -1 then we set the song to the last song
               await setCurrentSong(songs[songs.length - 1]);
               activeLibraryHandler(songs[(currentIndex - 1)]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]); 
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if(isPlaying) audioRef.current.play();
    }
    //state
    // const [songInfo, setSongInfo] = useState({//making state as an object
    //     currentTime: 0,
    //     duration: 0
    // });
    //moving this state up to app

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} 
                className="track">
                    <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    //setting parameters above and settign value of slide below
                    value={songInfo.currentTime} 
                    onChange={dragHandler}
                    type="range" />
                    <div style={trackAnim} className="animate-track"></div>
                    {/* animate track will show where we are in the track  */}
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0.00"}</p>
                {/* we did or 0 bc NaN pops up really quick and gives error when page first loaded */}
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                onClick={() => skipTrackHandler('skip-back')}  
                // we add function so the function wont run immediately
                className="skip-back" 
                size="2x" 
                icon={faAngleLeft} />

                <FontAwesomeIcon 
                onClick={playSongHandler}  
                className="play" 
                size="2x" 
                icon={isPlaying ? faPause : faPlay} />

                <FontAwesomeIcon  
                className="skip-forward" 
                size="2x" 
                icon={faAngleRight}
                onClick={() => skipTrackHandler('skip-forward')}   />
            </div>
            {/* <audio 
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler}
            ref={audioRef} 
            src={currentSong.audio}></audio> 
            
            we will be moving the audio above up to app*/}
            
            {/* getting .mp3 from data */}
        </div>

    )
}

export default Player;