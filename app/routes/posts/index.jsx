import { json } from "@remix-run/node";
import { getPosts } from "../../models/post.server";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const posts = useLoaderData();
  console.log(posts);
  return (
    <main>
      <h1>Posts</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {posts.posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
