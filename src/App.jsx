import React, { useState, useEffect } from "react";
import { Manga } from "mangadex-full-api";
import SearchForm from "./components/SearchForm";
import MangaList from "./components/MangaList";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // Novo estado para indicar o carregamento
  const [lengthSearch, setLengthSearch] = useState(0);
  const [foundMangas, setFoundMangas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [mangasPerPage] = useState(5);

  const searchManga = async (search) => {
    try {
      setLoading(true); // Ativa o indicador de carregamento
      const mangas = await Manga.search({
        title: search,
        limit: Infinity,
        hasAvailableChapters: true,
      });

      setLengthSearch(mangas.length);
      setFoundMangas(mangas);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error fetching manga data:", error);
    } finally {
      setLoading(false); // Desativa o indicador de carregamento, independente de sucesso ou falha
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(lengthSearch / mangasPerPage) - 1)
    );
  };

  useEffect(() => {
    const fetchCovers = async () => {
      const mangasWithCovers = await Promise.all(
        foundMangas.map(async (manga) => {
          const covers = await manga.getCovers();
          return { manga, covers };
        })
      );

      setFoundMangas(mangasWithCovers);
    };

    fetchCovers();
  }, [foundMangas]);

  return (
    <div className="container mx-auto p-4">
      <p className="text-xl font-bold mb-4">Manga Dex API</p>
      <p>There are {lengthSearch} mangas with "{search}" in the title!</p>

      <SearchForm onSearch={searchManga} />

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Found Mangas:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <MangaList
              mangas={foundMangas.slice(
                currentPage * mangasPerPage,
                (currentPage + 1) * mangasPerPage
              )}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(lengthSearch / mangasPerPage)}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;