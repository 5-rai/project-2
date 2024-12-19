import Loading from "../common/Loading";
import MessageListItem from "./MessageListItem";

interface MessageSidebarProps {
  messageList: Conversation[] | null;
  loading: boolean;
  error: boolean;
}

export default function MessageSidebar({
  messageList,
  loading,
  error,
}: MessageSidebarProps) {
  return (
    <aside className="h-full w-[419px] border-l px-7 pr-3 overflow-hidden flex flex-col shrink-0">
      <h2 className="font-semibold text-2xl mt-10 mb-5">메시지함</h2>
      {loading && <Loading />}
      {!loading && error && (
        <p className="text-center mt-10 text-lg">
          메시지 목록을 불러오는데 실패했습니다.
        </p>
      )}
      <section className="overflow-y-scroll custom-scrollbar mb-5 flex flex-col">
        {messageList && messageList.length > 0 ? (
          messageList.map((message) => (
            <MessageListItem
              key={message._id.join("-")}
              conversation={message}
            />
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 mt-10 text-lg text-gray-54">
            <p>아직 주고받은 메시지가 없어요...</p>
            <p>유저 프로필을 통해 메시지를 보내보세요!</p>
          </div>
        )}
      </section>
    </aside>
  );
}
