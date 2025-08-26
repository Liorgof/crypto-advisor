import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function DashboardSection({
  section,
  title,
  icon,
  children,
  votes,
  onVote,
  content,
  color = "bg-gray-800",
}) {
  const voteObj = votes?.[section];
  const voteValue = voteObj?.content === content ? voteObj?.value : undefined;

  return (
    <section className={`${color} p-6 rounded-xl shadow-lg`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>

      {children}

      {votes && onVote && (
        <div className="space-x-2 mt-4">
          <button
            onClick={() => onVote(section, true, content)}
            className={`inline-flex items-center justify-center p-2 rounded transition
              ${
                voteValue === true
                  ? "bg-green-800 border-2 border-white shadow-lg"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
          >
            <ThumbsUp size={20} strokeWidth={voteValue === true ? 3 : 2} />
          </button>

          <button
            onClick={() => onVote(section, false, content)}
            className={`inline-flex items-center justify-center p-2 rounded transition
              ${
                voteValue === false
                  ? "bg-red-800 border-2 border-white shadow-lg"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
          >
            <ThumbsDown size={20} strokeWidth={voteValue === false ? 3 : 2} />
          </button>
        </div>
      )}
    </section>
  );
}
