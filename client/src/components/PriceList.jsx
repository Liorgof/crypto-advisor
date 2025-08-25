export default function PriceList({ prices }) {
  return (
    <ul className="grid grid-cols-2 gap-3 mb-3">
      {Object.entries(prices).map(([coin, value]) => (
        <li
          key={coin}
          className="border p-3 rounded bg-gray-900 text-center font-semibold"
        >
          {coin.toUpperCase()}: ${value.usd}
        </li>
      ))}
    </ul>
  );
}
