import { gql } from "@apollo/client";
import Link from "next/link";
import { client } from "../../lib/apolloClient";
import Layout from "../../components/Layout";

export default function Location({ location }) {
  const { photo, name, description } = location;

  return (
    <Layout>
      <Link href="/providers">
        <a className="providers-link">&#8592; View Providers</a>
      </Link>
      <article className="location">
        {photo ? <img src={photo.sourceUrl} alt={photo.altText} /> : null}
        <h1>{name}</h1>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </article>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

const GET_LOCATION = gql`
  query getLocation($id: ID!) {
    location(id: $id, idType: DATABASE_ID) {
      name
      description
      photo {
        sourceUrl
        altText
      }
    }
  }
`;

export async function getStaticProps(context) {
  const { id } = context.params;
  const response = await client.query({
    query: GET_LOCATION,
    variables: { id },
  });

  const location = response?.data?.location;

  if (!location) {
    return { notFound: true };
  }

  return {
    props: { location },
    revalidate: 600,
  };
}
