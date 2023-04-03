import React from 'react';
import './css/slider.scss';
import Image from '../../assets/computer-image.png';
import storeIcon from '../../assets/entypo_shop.svg';



const Slider = () => {
  return (
    <div className=' p-4'>
        <div className='slider-wrapper'>
            <div className='slider-info'>
                <div>
                    <h1 className='text-dark fw-bold'>STAY HOME</h1>
                    <h1>SHOP ONLINE</h1>
                </div>
                <p>
                    Nulla purus enim, viverra fermentum metus elementum, 
                    ornare viverra dolor. Nullam mi ipsum, convallis eget erat vitae,
                     accumsan pretium est. 
                    </p>
                <button>
                    <img src ={storeIcon} alt=""/>
                    SHOP NOW
                </button>
            </div>
            <div>
                <img src={Image} alt=""/>
            </div> 
        </div>
        
    </div>
  );
}

export default Slider;