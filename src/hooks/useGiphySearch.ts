import { GiphyFetch, MediaType } from "@giphy/js-fetch-api";
import { useCallback } from "react";

const gf = new GiphyFetch(import.meta.env.VITE_REACT_GIPHY_API_KEY);

export type UseGiphySearchProps = {
  searchTerm?: string;
  limit?: number;
  type?: MediaType;
};

export const useGiphySearch = ({
  searchTerm = "",
  limit = 10,
  type = "stickers",
}: UseGiphySearchProps) => {
  const fetchGifs = useCallback(
    (offset: number) => gf.search(searchTerm, { offset, limit, type }),
    [searchTerm, limit, type]
  );

  return {
    searchKey: searchTerm,
    fetchGifs,
  };
};
