"use client";
import { useEffect, useState } from "react";

type Note = {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  summary?: string;
  favorite?: boolean;
};

export default function FavoritesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data.filter((n: any) => n.summary)));
  }, []);

  return (
    <div>
      <h1>Favorites Debug</h1>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}