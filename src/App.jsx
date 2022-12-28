import { MovieCard, SearchAngolia } from "./components";

export const App = () => {
  return (
    <div className="bg-indigo-300 min-h-screen">
      <SearchAngolia />
      <MovieCard />
    </div>
  );
};
