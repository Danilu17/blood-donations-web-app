// src/hooks/useEnrollments.js
import { useState, useEffect } from "react";
import api from "../services/api";

export default function useEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/enrollments");
        setEnrollments(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { enrollments, isLoading, error };
}
