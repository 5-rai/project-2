import React, { useEffect, useRef, useState } from "react";
import { postMessage } from "../../api/message";

interface MessageFromProps {
  userId: string;
  refetch: () => void;
}

export default function MessageForm({ userId, refetch }: MessageFromProps) {
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      24 * 5
    )}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    adjustHeight();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newMessage);
    const data = await postMessage(newMessage, userId);
    if (data) {
      setNewMessage("");
      refetch();
      adjustHeight();
      // TODO: 메시지 확인 API 쏘기
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <section className="border-t border-gray-c8 px-10 pb-8">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="block w-full mt-5 p-4 pr-1 border border-gray-c8 rounded-[15px] dark:border-gray-c8/50 dark:bg-white/20">
          <textarea
            ref={textareaRef}
            rows={1}
            value={newMessage}
            placeholder="메시지를 입력해주세요."
            className="block w-full resize-none overflow-y-scroll custom-scrollbar bg-transparent text-gray-22"
            onChange={handleChange}
          />
        </div>
        <button
          className="self-end rounded-xl mt-4 py-2 px-5 text-gray-22 primary-btn"
          type="submit"
          disabled={newMessage === ""}
        >
          보내기
        </button>
      </form>
    </section>
  );
}
