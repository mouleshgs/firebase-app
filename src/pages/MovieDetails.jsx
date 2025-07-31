import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import ReviewForm from "../components/ReviewForm";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const movieDoc = await getDoc(doc(db, "movies", id));
      setMovie(movieDoc.data());

      const q = query(collection(db, "reviews"), where("movieId", "==", id));
      const snapshot = await getDocs(q);
      setReviews(snapshot.docs.map(doc => doc.data()));
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{movie.title} ({movie.year})</h2>
      <p>{movie.description}</p>

      <h3 className="mt-6 font-semibold text-lg">Reviews</h3>
      <ul className="list-disc list-inside">
        {reviews.map((rev, i) => (
          <li key={i}>{rev.username}: {rev.comment}</li>
        ))}
      </ul>

      <ReviewForm movieId={id} />
    </div>
  );
}
