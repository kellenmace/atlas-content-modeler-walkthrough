import ProviderCard from "./ProviderCard";

export default function ProvidersList({ providers }) {
  return (
    <ul className="doctors-list">
      {providers.map((provider) => (
        <li key={provider.databaseId}>
          <ProviderCard provider={provider} />
        </li>
      ))}
    </ul>
  );
}
