import { gql } from "@apollo/client";
import Link from "next/link";

export const PROVIDER_CARD_FIELDS = gql`
  fragment ProviderCardFields on Provider {
    databaseId
    uri
    name
    credentials
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
`;

export default function ProviderCard({ provider }) {
  const { uri, name, credentials, profilePhoto, specialties, locations } =
    provider;

  return (
    <article className="card">
      <Link href={uri}>
        <a>
          <h2>
            {name}, {credentials}
          </h2>
        </a>
      </Link>
      {profilePhoto ? (
        <Link href={uri}>
          <a>
            <img src={profilePhoto.sourceUrl} alt={profilePhoto.altText} />
          </a>
        </Link>
      ) : null}
      <h3>Specialty</h3>
      {specialties.nodes.map((specialty) => specialty.name).join(", ")}
      <h3>Locations</h3>
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
  );
}
