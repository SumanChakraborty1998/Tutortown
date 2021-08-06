import React from "react";
import { Carousel } from "react-responsive-carousel";
import images1 from "../Images/Carousel1.jpg";
import images2 from "../Images/Carousel2.jpg";
import images3 from "../Images/Carousel3.jpg";
import images4 from "../Images/Carousel4.jpg";
import images5 from "../Images/Carousel5.jpeg";
import images6 from "../Images/Carousel9.jpg";
import images7 from "../Images/Carousel10.jpg";

const ImageCarousel = () => (
  <Carousel autoPlay showIndicators={false} showThumbs={false} >
    
    <div>
      <img
        alt=""
        src={images5} height="500px" />
    </div>

    <div>
      <img
        alt=""
        src={images2} height="500px" />
    </div>

    <div>
      <img
        alt=""
        src={images3} height="500px" />
    </div>

    <div>
      <img
        alt=""
        src={images1} width="100%" height="500px" />
    </div>

    <div>
      <img
        alt=""
        src={images4} height="500px" />
    </div>

    <div>
      <img
        alt=""
        src={images7} width="100%" height="500px" />
    </div>
    
    <div>
      <img
        alt=""
        src={images6} width="100%" height="500px" />
    </div>
  </Carousel>
)

export default ImageCarousel;



