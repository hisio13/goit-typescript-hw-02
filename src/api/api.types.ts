export interface UnsplashImage {
    id: string;
    alt_description: string;
    urls: {
      small: string;
      regular: string;
      full: string;
    };
  }
  
  export interface ApiResponseData {
    results: UnsplashImage[];
    total: number;
    total_pages: number;
  }
  