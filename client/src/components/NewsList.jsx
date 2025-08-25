export default function NewsList({ news }) {
  return (
    <ul className="space-y-3 mb-3">
      {news.map((n) => (
        <li key={n.id} className="border-b pb-2">
          <a
            href={`https://cryptopanic.com/news/${n.slug}`}
            target="_blank"
            rel="noreferrer"
            className="text-purple-400 hover:underline text-base font-medium"
          >
            {n.title}
          </a>
          <p className="text-sm text-gray-400">{n.description}</p>
        </li>
      ))}
    </ul>
  );
}
