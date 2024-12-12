import { useRef, useState } from "react";
import { createComment } from "../../api/comment";
import { usePostStore } from "../../store/postStore";
import { useNavigate } from "react-router";

export default function CommentWrite() {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState("");
  const postId = usePostStore((state) => state.postId);
  const addComment = usePostStore((state) => state.addComment);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    adjustHeight(e.target);
  };

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    // 높이가 5줄까지만 늘어나도록 설정
    if (textarea.scrollHeight < 24 * 5) {
      textarea.style.height = "auto"; // 기존 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = textareaRef.current!.value;
    const data = await createComment({ comment, postId });
    textareaRef.current!.value = "";

    if (data?.status === 401) {
      const isConfirmed = window.confirm(
        "로그인이 필요한 기능입니다. 로그인 하시겠습니까?"
      );
      isConfirmed && navigate("/login");
      return;
    }

    addComment(data as Comment);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end w-full border-t border-gray-ee dark:border-gray-ee/50 gap-3 mt-5 px-6"
    >
      <div className="w-full border border-gray-c8 p-3 mt-[23px] rounded-[15px] bg-white/20 focus-within:border-primary">
        <textarea
          ref={textareaRef}
          rows={1}
          className="block w-full h-[47px] bg-transparent resize-none custom-scrollbar"
          onChange={handleChange}
          placeholder="댓글을 적어주세요!"
        ></textarea>
      </div>
      <button
        disabled={!comment}
        className="bg-primary primary-btn rounded-[15px] w-[67px] py-1"
      >
        등록
      </button>
    </form>
  );
}
