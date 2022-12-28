import { MovieCard, SearchAngolia } from "./components";

export const App = () => {
  return (
    <div className="bg-indigo-400 min-h-screen">
      <SearchAngolia />
      <MovieCard />
    </div>
  );
};
