import React from 'react';
import './BeatCount.css'

const BeatCount = (props) => (
  <div className="beat-count">
      
      {props.count % props.beatsPerMeasure === 0 ? props.beatsPerMeasure : props.count}  
       
  </div>
);

export default BeatCount;