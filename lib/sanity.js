import client, { previewClient } from "./client";

const getUniqueItems = (items) => {
  const slugs = new Set();
  return items.filter((item) => {
    if (slugs.has(item.slug)) {
      return false;
    } else {
      slugs.add(item.slug);
      return true;
    }
  });
};

const postFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`;
const pageFields = `
  _id,
  'backgroundImage': backgroundImage.asset->url,
  title,
  subtitle,
  body,
`;
const serviceFields = `
name,
slug,
'images': image->image.asset->url,
sessionVariants,
callToAction,
notes,
_id,
tags,  
`;

const getClient = (preview) => (preview ? previewClient : client);

export async function getPageBySlug(slug) {
  const data = await client.fetch(
    `*[_type == "websitePage" && slug.current == '${slug}']{${pageFields}}`
  );
  return data;
}

export async function getServices(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "service"] | order(publishedAt desc)`
  );
  return getUniqueItems(results);
}

export async function getAllPages(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "portfolioItem"] | order(publishedAt desc){
      ${postFields}
    }`);
  return getUniqueItems(results);
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        'comments': *[
                      _type == "comment" && 
                      post._ref == ^._id && 
                      approved == true] {
          _id, 
          name, 
          email, 
          comment, 
          _createdAt
        }
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...2]`,
      { slug }
    ),
  ]);
  return { post, morePosts: getUniqueItems(morePosts) };
}
