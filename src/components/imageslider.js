import React, { Component, useState } from "react";
import "../styles/slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const pics = [
  {
    src: "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1481437642641-2f0ae875f836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1484353371297-d8cfd2895020?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1479&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1523464862212-d6631d073194?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];
const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = pics.length;
  const Previous = () => {
    setCurrent(current == 0 ? length - 1 : current - 1);
  };
  const Next = () => {
    setCurrent(current == length - 1 ? 0 : current + 1);
  };
  // if(Array.isArray(pics)){
  //     return null;
  // }
  return (
    <section className="slider">
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={Previous}
        className="left-arrow"
      />
      {pics.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide.src} alt="travel image" className="image" />
            )}
          </div>
        );
      })}

      <FontAwesomeIcon
        icon={faArrowRight}
        onClick={Next}
        className="rigth-arrow"
      />
    </section>
  );
};
export default ImageSlider;
