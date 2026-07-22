import { defineQuery } from "next-sanity";

const productProjection = `{
  "lastUpdated": _updatedAt,
  editorialVersion,
  sourceKey,
  "slug": slug.current,
  "category": coalesce(category->name, model->category->name),
  "categoryKey": coalesce(categoryKey, model->category->name),
  "title": model->name,
  "shortTitle": model->name,
  "model": model->{
    "key": slug.current,
    name,
    brand,
    releaseYear,
    "specs": specs[]{
      "id": _key,
      label,
      value
    }
  },
  unitDetails{
    storage,
    ram,
    colour,
    batteryHealth,
    batteryCycleCount,
    ptaStatus,
    boxStatus,
    warranty,
    keyboardLayout,
    chargerIncluded,
    connectivity,
    size,
    edition,
    controllerIncluded,
    gamesIncluded,
    connector,
    cableLength,
    serialStatus,
    includedItems
  },
  status,
  condition,
  price,
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
    "title": coalesce(title, "Product image"),
    "caption": coalesce(caption, "Ask MacVault for current photos of the exact unit."),
    "kind": coalesce(kind, select(
      ^.categoryKey == "iPhone" => "phone",
      ^.categoryKey == "Mac" => "laptop",
      ^.categoryKey == "iPad" => "tablet",
      ^.categoryKey == "Watch" => "watch",
      ^.categoryKey == "PlayStation" => "console",
      "audio"
    )),
    "imageUrl": image.asset->url,
    "imageAlt": coalesce(alt, ^.title, ^.model->name, "MacVault product"),
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
  *[_type == "product" && visibility == "active" && defined(slug.current) && (category->active == "active" || model->category->active == "active")]
  | order(sortOrder asc, _createdAt desc) ${productProjection}
`);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "product" && visibility == "active" && defined(slug.current) && coalesce(category->slug.current, model->category->slug.current) == $slug && (category->active == "active" || model->category->active == "active")]
  | order(sortOrder asc, _createdAt desc) ${productProjection}
`);

export const PRODUCT_QUERY = defineQuery(`
  *[_type == "product" && visibility == "active" && slug.current == $slug && (category->active == "active" || model->category->active == "active")][0]
  ${productProjection}
`);

export const PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product" && visibility == "active" && defined(slug.current)][]{"slug": slug.current}
`);

export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category" && active == "active" && defined(slug.current)][]{"slug": slug.current}
`);
