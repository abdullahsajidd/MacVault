import { defineQuery } from "next-sanity";

const productProjection = `{
  _id,
  "slug": slug.current,
  "category": category->name,
  title,
  shortTitle,
  status,
  condition,
  price,
  badge,
  accent,
  summary,
  description,
  specs,
  details[]{
    "label": label,
    "value": value
  },
  technicalSpecs[]{
    "id": _key,
    label,
    value
  },
  listingOptions[]{
    "id": _key,
    label,
    values
  },
  highlights,
  packageItems,
  gallery[]{
    _key,
    title,
    caption,
    kind,
    "imageUrl": image.asset->url,
    "imageAlt": alt,
    sourceUrl,
    usage
  }
}`;

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && active == "active" && defined(slug.current)]
  | order(sortOrder asc, name asc) {
    _id,
    "category": name,
    label,
    pluralLabel,
    "slug": slug.current,
    "href": "/products/category/" + slug.current
  }
`);

export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && visibility == "active" && defined(slug.current) && category->active == "active"]
  | order(sortOrder asc, _createdAt desc) ${productProjection}
`);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "product" && visibility == "active" && defined(slug.current) && category->slug.current == $slug && category->active == "active"]
  | order(sortOrder asc, _createdAt desc) ${productProjection}
`);

export const PRODUCT_QUERY = defineQuery(`
  *[_type == "product" && visibility == "active" && slug.current == $slug && category->active == "active"][0]
  ${productProjection}
`);

export const PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product" && visibility == "active" && defined(slug.current)][]{"slug": slug.current}
`);

export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && active == "active" && defined(slug.current)][]{"slug": slug.current}
`);
