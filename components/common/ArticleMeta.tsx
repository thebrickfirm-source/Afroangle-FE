// 3. Small helper for repeated metadata (Author/Date)
interface ArticleMetaProps {
  author?: string;
  date?: string;
  large?: boolean;
}
const ArticleMeta = ({ author, date, large = false }) => (
  <div className={`flex gap-2 ${large ? "text-xl" : ""}`}>
    <p>{author}</p>
    <span className="text-neutral-400 ">•</span>
    <p>{date}</p>
  </div>
);
export default ArticleMeta;
