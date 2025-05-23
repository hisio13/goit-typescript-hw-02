import { useEffect, useState } from 'react';
import { fetchImages, UnsplashImage } from './services/api';
import ImageGallery from './components/ImageGallery';
import SearchBar from './components/SearchBar';
import LoadMoreBtn from './components/LoadMoreBtn';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        const data = await fetchImages(query, page);
        setImages((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
      } catch {
        toast.error('Failed to fetch images');
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      <ImageGallery images={images} onImageClick={() => {}} />
      {images.length > 0 && <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />}
    </div>
  );
}
