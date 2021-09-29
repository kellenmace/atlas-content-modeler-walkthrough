import { gql } from "@apollo/client";
import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";
import ProvidersList from "../components/ProvidersList";
import { PROVIDER_CARD_FIELDS } from "../components/ProviderCard";

const GET_PROVIDERS = gql`
  query getProviders {
    providers(first: 10) {
      nodes {
        ...ProviderCardFields
      }
    }
  }
  ${PROVIDER_CARD_FIELDS}
`;

export default function Providers({ providers }) {
  return (
    <Layout>
      <h1>Providers</h1>
      <ProvidersList providers={providers} />
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await client.query({
    query: GET_PROVIDERS,
  });

  return {
    props: {
      providers: response?.data?.providers?.nodes ?? [],
    },
  };
}
