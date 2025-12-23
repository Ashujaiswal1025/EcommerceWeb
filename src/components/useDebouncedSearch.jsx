
import { useState, useEffect } from "react";

export default function useDebouncedSearch(query, delay = 500) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), delay);
    return () => clearTimeout(handler);
  }, [query, delay]);

  return debouncedQuery;
}
