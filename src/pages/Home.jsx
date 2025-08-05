import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      const snapshot = await getDocs(collection(db, "movies"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(data);
    };
    fetchMovies();
  }, []);

function handleClick() {
    navigate("/add");
}
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎬 My Letterboxd</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <button onClick={handleClick} className="bg-green-500 rounded-xl p-5 mt-10 text-xl font-semibold cursor-pointer" > Add Movie {" + "}</button>
    </div>
  );
}
