import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="border rounded p-3 shadow hover:shadow-lg">
        <h2 className="font-semibold text-xl">{movie.title}</h2>
        <p>{movie.year}</p>
      </div>
    </Link>
  );
}