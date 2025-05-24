import { ImageInfo } from "../../types/types";

  export interface ImageGalleryProps {
    sendPhoto: ImageInfo[];
    handleClick: (url: string) => void;
  }
  
  export interface SearchBarProps {
    onSearch: (query: string) => void;
  }
  
  export interface LoadMoreBtnProps {
    onClick: () => void;
  }
  