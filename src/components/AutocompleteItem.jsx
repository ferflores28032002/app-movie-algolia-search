import { useNavigate } from "react-router-dom";

export const AutocompleteItem = ({ id, release_date, title, poster_path }) => {

  const navigate = useNavigate()

  return (
    <li onClick={() => navigate('?search='+ id)} className="hover:cursor-pointer" >
      <div>
        <a className="hover:bg-blue-300  rounded-sm flex gap-4 p-4">
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={title}
            className="w-16 h-16  object-contain"
          />
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-gray-600">{release_date}</p>
          </div>
        </a>
      </div>
    </li>
  );
};
