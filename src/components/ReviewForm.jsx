import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function ReviewForm({ movieId }) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "reviews"), {
      movieId,
      username,
      comment
    });
    setUsername("");
    setComment("");
    alert("Review added!");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <input
        className="block w-full border p-2 rounded"
        placeholder="Your name"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <textarea
        className="block w-full border p-2 rounded"
        placeholder="Your review"
        value={comment}
        onChange={e => setComment(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Post Review</button>
    </form>
  );
}
