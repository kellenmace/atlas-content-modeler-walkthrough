import { gql } from "@apollo/client";
import Link from "next/link";
import { client } from "../../lib/apolloClient";
import Layout from "../../components/Layout";

export default function Provider({ provider }) {
  const {
    name,
    credentials,
    bio,
    practicingSince,
    profilePhoto,
    specialties,
    locations,
  } = provider;

  return (
    <Layout>
      <Link href="/providers">
        <a className="providers-link">&#8592; View Providers</a>
      </Link>
      <article className="provider">
        {profilePhoto ? (
          <img src={profilePhoto.sourceUrl} alt={profilePhoto.altText} />
        ) : null}
        <h1>
          {name}, {credentials}
        </h1>
        <p className="practicing-since">Practicing since {practicingSince}</p>
        <h2>Bio</h2>
        <div dangerouslySetInnerHTML={{ __html: bio }} />
        <h2>Specialty</h2>
        {specialties.nodes.map((specialty) => specialty.name).join(", ")}
        <h2>Locations</h2>
        <ul className="locations-list">
          {locations.nodes.map((location) => {
            return (
              <li key={location.databaseId}>
                🏥 <Link href={location.uri}>{location.name}</Link>
              </li>
            );
          })}
        </ul>
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

const GET_PROVIDER = gql`
  query getProvider($id: ID!) {
    provider(id: $id, idType: DATABASE_ID) {
      name
      credentials
      bio
      practicingSince
      profilePhoto {
        sourceUrl
        altText
      }
      specialties {
        nodes {
          name
        }
      }
      locations {
        nodes {
          databaseId
          name
          uri
        }
      }
    }
  }
`;

export async function getStaticProps(context) {
  const { id } = context.params;
  const response = await client.query({
    query: GET_PROVIDER,
    variables: { id },
  });

  const provider = response?.data?.provider;

  if (!provider) {
    return { notFound: true };
  }

  return {
    props: { provider },
    revalidate: 600,
  };
}
