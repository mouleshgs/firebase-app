import { useEffect, useState } from "react";
import { db, storage } from "./firebase";
import {
collection, addDoc, getDocs, updateDoc, deleteDoc, doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth, AuthProvider } from "./AuthContext";
function App() {
const { user, login, logout } = useAuth();
const [items, setItems] = useState([]);
const [file, setFile] = useState(null);
const col = collection(db, "items");
useEffect(() => {
const load = async () => {
const snap = await getDocs(col);
setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
};
load();
}, []);
const addItem = async () => {
let photoURL = "";
if (file) {
const storageRef = ref(storage, `uploads/${file.name}`);
await uploadBytes(storageRef, file);
photoURL = await getDownloadURL(storageRef);
}
await addDoc(col, { text: "Hello", owner: user.uid, photoURL });
};
const updateItem = id => updateDoc(doc(db, "items", id), { text: "Updated" });
const deleteItem = id => deleteDoc(doc(db, "items", id));
return (
<div>
{user ? <>
<button onClick={logout}>Sign out</button>
<input type="file" onChange={e => setFile(e.target.files[0])} />
<button onClick={addItem}>Add</button>
{items.map(i => (
<div key={i.id}>
{i.photoURL && <img src={i.photoURL} width={50} />}
<span>{i.text}</span>
<button onClick={() => updateItem(i.id)}> </button>
<button onClick={() => deleteItem(i.id)}> </button>
</div>
))}
</> : <button onClick={login}>Sign in with Google</button>}
</div>
);
}
export default function RootApp() {
return (
<AuthProvider>
<App />
</AuthProvider>
);
}