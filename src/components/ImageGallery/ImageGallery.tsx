import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Photo } from "./ImageGallery.types";
interface ImageGalleryProps {
  sendPhoto: Photo[];
  handleClick: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  sendPhoto,
  handleClick,
}) => {
  return (
    <ul className={css.cards}>
      {sendPhoto.map((item) => (
        <li key={item.id}>
          <ImageCard sendItem={item} handleClick={handleClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;