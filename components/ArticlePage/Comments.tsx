import { getArticleComments } from "@/sanity/services/commentService";

const Comments = () => {
  const comments = getArticleComments(id);

  return (
    <div className="max-w-3xl w-full mx-auto space-y-9">
      <h5 className="uppercase text-2xl text-primary-red">Comments</h5>
      {comments &&
        comments.map((comment, index) => {
          <div className="bg-neutral px-10 py-8" key={index}>
            <h6 className="">
          </div>;
        })}
      <div className=""></div>
    </div>
  );
};

export default Comments;
