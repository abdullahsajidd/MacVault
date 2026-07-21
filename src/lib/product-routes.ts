export function productPath(slug: string) {
  return `/products/${encodeURIComponent(slug)}`;
}

export function productSlugFromParam(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
