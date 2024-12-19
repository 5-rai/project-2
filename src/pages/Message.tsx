import { useSearchParams } from "react-router";
import MessageSidebar from "../components/Message/MessageSidebar";
import { useEffect } from "react";
import Loading from "../components/common/Loading";
import MessageHistory from "../components/Message/MessageHistory";
import MessageForm from "../components/Message/MessageForm";
import { checkMessageSeen } from "../api/message";
import useGetMessageList from "../hooks/useGetMessageList";
import useGetConversationWithUser from "../hooks/useGetConversationWithUser";

export default function Message() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user") ?? "";
  const {
    conversation,
    loading: conversationLoading,
    error: conversationError,
    refetch: conversationRefetch,
  } = useGetConversationWithUser(userId);
  const {
    messageList,
    loading: messageListLoading,
    error: messageListError,
    refetch: messageListRefetch,
  } = useGetMessageList();

  useEffect(() => {
    if (userId) checkMessageSeen(userId);
  }, [conversation]);

  if (!userId)
    return (
      <div className="flex w-full screen-100vh">
        <section className="grow h-full flex flex-col">
          {!userId && (
            <p className="w-full text-lg text-center text-gray-54 mt-36">
              메시지 목록을 선택해주세요.
            </p>
          )}
        </section>
        <MessageSidebar
          messageList={messageList}
          loading={messageListLoading}
          error={messageListError}
        />
      </div>
    );

  return (
    <div className="flex w-full screen-100vh">
      <section className="grow h-full flex flex-col">
        {conversationLoading ? (
          <Loading />
        ) : conversationError ? (
          <p className="w-full text-lg text-center mt-36">
            사용자 정보를 불러오는 데 실패했습니다.
          </p>
        ) : (
          <>
            <MessageHistory userId={userId} messages={conversation} />
            <MessageForm
              userId={userId}
              conversationRefetch={conversationRefetch}
              messageListRefetch={messageListRefetch}
            />
          </>
        )}
      </section>
      <MessageSidebar
        messageList={messageList}
        loading={messageListLoading}
        error={messageListError}
      />
    </div>
  );
}
