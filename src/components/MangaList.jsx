import React from "react";

const MangaList = ({ mangas }) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mangas.map(({ manga, covers }) => (
        <React.Fragment key={manga?.id}>
          {covers?.length > 0 && (
            <div className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img
                  src={covers[0].url}
                  className="w-full h-80 object-cover object-center"
                  alt={`Cover of ${manga.localTitle}`}
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold mb-2">
                  {manga?.localTitle}
                  <div className="badge badge-secondary capitalize">
                    {manga.status}
                  </div>
                </h2>
               
                <p className="text-sm mb-4">{manga.description.en}</p>
                <div className="flex justify-between items-center">
                
                  <div className="badge badge-outline capitalize">
                    {manga.publicationDemographic}
                  </div>
                  <div className="badge badge-ghost hover cursor-pointer">
                    <a
                      href={manga.links.myAnimeList}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {manga.links.myAnimeList ? "My Anime List" : "Unofficial"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default MangaList;