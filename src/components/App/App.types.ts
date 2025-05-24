export interface UnsplashImage {
    id: string;
    alt_description: string;
    urls: {
      small: string;
      regular: string;
      full: string;
    };
    user: {
      name: string;
    };
  }

  export interface ImageGalleryProps {
    sendPhoto: UnsplashImage[];
    handleClick: (url: string) => void;
  }
  
  export interface SearchBarProps {
    onSearch: (query: string) => void;
  }
  
  export interface LoadMoreBtnProps {
    onClick: () => void;
  }
  