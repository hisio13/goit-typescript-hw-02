import { useEffect, useState } from "react";
import fetchImages from "../../api/fetchImages";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMore from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { ImageInfo } from "../../types/types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ImageInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      try {
        setIsLoading(true);
        setCanLoadMore(false);

        const { results, total_pages } = await fetchImages(query, page);
        if (results.length === 0) {
          return toast.error("No images found");
        }
        setImages((prevImages) => [...prevImages, ...results]);
        if (page < total_pages) {
          setCanLoadMore(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(error.message);
          setCanLoadMore(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearchSubmit = (query: string) => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setError("");
  };

  const handleLoadMoreClick = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const handleImgClick = (id: string) => {
    if (!images.length) return;
    const image = images.find((img) => img.id === id);
    if (!image) return;
    setModalImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <main>
        {error.length !== 0 ? (
          <ErrorMessage message={error} />
        ) : (
          images.length !== 0 && (
            <ImageGallery galleryList={images} onImgClick={handleImgClick} />
          )
        )}

        {isLoading && <Loader />}
        {!isLoading && canLoadMore && (
          <LoadMore onLoadMoreClick={handleLoadMoreClick} />
        )}

        <ImageModal
          isModalOpen={isModalOpen}
          openedItem={modalImage}
          closeModal={handleModalClose}
        />
        <Toaster position="top-center" />
      </main>
    </>
  );
}

export default App;