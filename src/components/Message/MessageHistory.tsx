import { useEffect, useState } from "react";
import MessageContent from "./MessageContent";
import { useAllUserStore } from "../../store/allUserStore";
import { NavLink } from "react-router";
import defaultProfileImg from "../../../public/logo.png";

interface MessageHistoryProps {
  userId: string;
  messages: Message[] | null;
}

export default function MessageHistory({
  userId,
  messages,
}: MessageHistoryProps) {
  const [userInfo, setUserInfo] = useState<User>();
  const getUser = useAllUserStore((state) => state.getUser);

  useEffect(() => {
    setUserInfo(getUser(userId));
  }, [userId]);

  return (
    <div className="pl-10 pr-6 grow flex flex-col overflow-hidden mt-10 mb-5">
      <section className="flex items-center mb-5 mr-4">
        <NavLink to={`/user/${userId}`} className="flex">
          <img
            src={userInfo?.image || defaultProfileImg}
            alt="프로필 이미지"
            className="w-8 h-8 mr-3 rounded-full profile"
          />
          <p className="text-xl dark:text-white font-semibold">
            {userInfo?.fullName}
          </p>
        </NavLink>
      </section>
      <section className="grow overflow-y-scroll custom-scrollbar">
        {messages?.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-54">
            <p>{userInfo?.fullName}님과 대화를 시작해보세요.</p>
          </div>
        )}
        {messages?.map((message) => (
          <MessageContent
            key={message._id}
            isOutgoingMessage={message.receiver._id === userId}
            message={message.message}
            date={message.createdAt}
          />
        ))}
      </section>
    </div>
  );
}
