import React from "react";
// import { getClient } from "@/lib/client";
import { getClient } from "../lib/client";
import { gql } from "@apollo/client";
import Link from "next/link";

interface PostNode {
  title: string;
  content: string;
  uri: string;
  id: string;
  // Add other properties as needed
}

const query = gql`
  query NewQuery {
    posts {
      edges {
        node {
          title
          uri
          content
          id
        }
      }
    }
  }
`;

export default async function page() {
  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  const posts = data.posts.edges.map(({ node }: { node: PostNode }) => node);

  console.log(posts);

  return (
    <section className="w-screen items-center justify-center flex py-16 px-4">
      <div className="max-w-[1000px]">
        <h1 className="font-bold text-3xl">All posts</h1>
        <div className="flex flex-col gap-4">
          {posts.map((post: PostNode) => {
            const title = post.title;
            const content = post.content;
            const uri = post.uri;
            const id = post.id;

            return (
              <div>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
                <Link href={{ pathname: `/posts/${uri}`, query: { id: id } }}>
                  Read more
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
