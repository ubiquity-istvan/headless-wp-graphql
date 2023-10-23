import { getClient } from "../../lib/client";
import { gql } from "@apollo/client";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = searchParams?.id;
  const query = gql`
    query MyQuery($id: ID!) {
      post(id: $id) {
        id
        content
      }
    }
  `;

  const { data } = await getClient().query({
    query,
    variables: { id },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  const content = data.post.content;
  console.log(content);

  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
}
