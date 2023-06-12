import React, { useState, useEffect } from 'react';
import previousImg from './previousImg.png';
import nextImg from './nextImg.png';
import './ImageSlider.css';






const ImageSlider = (props) => {

    const [currentSlide, setCurrentSlide] = useState(props.slideIndex);

    const clickNext = () => {
        if (currentSlide < 4)
            setCurrentSlide(currentSlide + 1);
    }
    const clickPrevious = () => {
        if (currentSlide > 0)
            setCurrentSlide(currentSlide - 1);
    }

   
    const prevImageStyle = {
        width: '45px',
        height: '100px',
        cursor: 'pointer',
        objectFit: 'contain',
        display: currentSlide === 0 ? 'none' : 'block',
      };
      

    const nextImageStyle = {
        width: '45px',
        height: '100px',
        cursor: 'pointer',
        objectFit: 'contain',
        display: currentSlide === 4 ? 'none' : 'block',
      };
      


    return (

        <div className='image-slider-container'>
            <div className='slide-picture'>
                <img src={props.slides[currentSlide]} alt="nice pictures"

                    style={{ maxHeight: '30em', width: '54em', objectFit: 'cover', borderRadius:'10px' }} />
            </div>
            <div>
                <img src={previousImg} alt="prev" className='previous-image' style={prevImageStyle} onClick={clickPrevious} />
            </div>
            <div>
                <img src={nextImg} alt="next" className='next-image' style={nextImageStyle} onClick={clickNext} />
            </div>

        </div>
    )
}

export default ImageSlider