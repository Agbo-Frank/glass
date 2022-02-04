import React, { Component } from "react";
import {Image} from 'cloudinary-react';
import Slider from "react-slick";

export default class ProductSlide extends React.Component{
  render() {
    const settings1 = {
      dots: false,
      infinite: false,
      speed: 500,
      rows: 1,
      slidesToShow: 1,
      slidesToScroll: 1,
      ref: slider => (this.slider = slider)
    };
    const settings2 = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      focusOnSelect: true,
    };
    // const arrimage = [
    //   images.product1,
    //   images.product2,
    //   images.product3,
    //   images.product4,
    //   images.product5,
    //   images.product6
    // ]
    const arrimage = this.props.arrimage
    return(
      <div className='product-page-slide'>
          <Slider {...settings1} className="slide">
            {
              arrimage.map(image => (
                <div key={image}>
                  <Image cloudName="agbofrank" publicId={image} secure="true" ></Image>
                </div>
              ))
            }
          </Slider>
          <Slider {...settings2} className="indicators">
            {
              arrimage.map((image, i) => (
                <div key={image} onClick={() => this.slider.slickGoTo(i, true)}>
                  <Image cloudName="agbofrank" publicId={image} secure="true" ></Image>
                </div>
              ))
            }
          </Slider>
        </div>
    )
  }
}