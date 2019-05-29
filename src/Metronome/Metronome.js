import React, {Component} from 'react';
import './Metronome.css';
import click1 from '../audio/click1.wav';
import click2 from '../audio/click2.wav';
import BeatCount from './BeatCount/BeatCount';


class Metronome extends Component {
    constructor(props){
        super(props);
        this.state = {
            playing: false,
            count: 0,
            bpm: 120,
            beatsPerMeasure: 4
        };
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleBpmChange = (event) => {  //will handle tempo changes in real time
        const bpm = event.target.value;
        if(this.state.playing){ //reset if you slide the counter while it's ticking
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60/bpm) *1000);
            this.setState({
                count: 0,
                bpm
            })
        } else { //if not ticking, just set the bpm
            this.setState({bpm});
        }

    }

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);  //clearInterval stops the time
            this.setState({playing: false});
        } else { //start the timer
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000  
            );
            this.setState(
                {
                    count: 1,
                    playing: true
                },
                this.playClick
            );
        }
    }

    playClick = () => {
        const {count, beatsPerMeasure} = this.state;
        if(count % beatsPerMeasure === 0) { //remember, this is the modulo trick that moves our counter down to zero
            this.click2.play();
        } else {
            this.click1.play();
        }
        this.setState(state => ({count: (state.count +1) % state.beatsPerMeasure}));  //keep tract of beat
    }

    fourBeats = () => {
        this.setState({beatsPerMeasure: 4});
    }

    threeBeats = () => {
        this.setState({beatsPerMeasure: 3});
    }

    twoBeats = () => {
        this.setState({beatsPerMeasure: 2});
    }


    render(){
       const{playing, bpm} = this.state;

        return(
            <div className="metronome">
                
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input 
                    type="range" 
                    min="40" 
                    max="280" 
                    value={bpm} 
                    onChange={this.handleBpmChange}
                    />
                </div>
                <div className="start-counter">
                    <button  
                        className="metronome-button"
                        onClick={this.startStop}
                        >
                        {playing ? 'Stop' : 'Start'} 
                    </button>
                    <BeatCount 
                    count={this.state.count}
                    beatsPerMeasure={this.state.beatsPerMeasure}
                    />
                </div>
                <div className="meters">
                    <button className="meter-btn" onClick={this.fourBeats}>4/4</button>
                    <button className="meter-btn" onClick={this.threeBeats}>3/4</button>
                    <button className="meter-btn" onClick={this.twoBeats}>2/4</button>
                </div>
                <button id="light" className="metronome-light" disabled
                style={{
                    backgroundColor: this.state.count === 1 ? "red" : "#1867DE"
                }}
                >  
                </button>
                
                
            </div>
        );
    }
}

export default Metronome;
