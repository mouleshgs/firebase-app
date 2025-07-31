import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "movies"), { title, year, description });
    setTitle("");
    setYear("");
    setDescription("");
    alert("Movie added!");
  };

  return (
    <form onSubmit={handleAdd} className="p-4 space-y-2">
      <h2 className="text-xl font-bold">Add a Movie</h2>
      <input className="block w-full border p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input className="block w-full border p-2" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
      <textarea className="block w-full border p-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
