import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Link from "next/link";

interface PostNode {
  title: string;
  content: string;
  uri: string;
  // Add other properties as needed
}

const client = new ApolloClient({
  uri: "https://headlesswpgql.wpenginepowered.com/graphql",
  cache: new InMemoryCache(),
});

const getPosts = async () => {
  const response = await client.query({
    query: gql`
      query NewQuery {
        posts {
          edges {
            node {
              title
              uri
              content
            }
          }
        }
      }
    `,
  });
  // .then((result) => console.log(result));
  //

  const posts = response.data.posts.edges.map(
    ({ node }: { node: PostNode }) => node
  );

  return posts;
};

export default async function Home() {
  const posts = await getPosts();

  console.log("These are the posts.");
  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl">
          This is a headless WordPress website.
        </h1>

        {/*Rendering posts */}
        <div className="flex flex-col gap-4">
          {posts.map((post: PostNode) => {
            const title = post.title;
            return (
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">{title}</h2>
                <Link href={"#"}>Read more</Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
