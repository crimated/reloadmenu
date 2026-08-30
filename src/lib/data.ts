import { queryOptions } from "@tanstack/react-query";
import type { Menu, SiteConfig } from "./types";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return (await res.json()) as T;
}

export const menuQuery = queryOptions({
  queryKey: ["menu"],
  queryFn: () => getJson<Menu>("/data/menu.json"),
  staleTime: 60_000,
});

export const configQuery = queryOptions({
  queryKey: ["config"],
  queryFn: () => getJson<SiteConfig>("/data/config.json"),
  staleTime: 60_000,
});
