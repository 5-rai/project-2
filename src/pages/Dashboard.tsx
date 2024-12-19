import { useParams } from "react-router";
import PostCard from "../components/common/PostCard";
import { useChannelStore } from "../store/channelStore";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import Loading from "../components/common/Loading";
import SortButton from "../components/Dashboard/SortButton";
import NewPostButton from "../components/Header/NewPostButton";

export default function Dashboard() {
  const { channelName } = useParams();
  const getIdFromName = useChannelStore((state) => state.getIdFromName);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [sortOption, setSortOption] = useState<string>("latest");

  // 선택된 채널 찾기 및 해당 채널의 포스트 불러오기
  useEffect(() => {
    if (!channelName) return;

    const channelId = getIdFromName(channelName);
    if (channelId) fetchPosts(channelId);
  }, [channelName, getIdFromName]);

  // 선택된 채널의 포스트 목록 API 요청
  const fetchPosts = async (channelId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/posts/channel/${channelId}`);
      setPosts(response.data);
    } catch {
      setError("카테고리의 포스트를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 포스트 정렬 로직
  useEffect(() => {
    let tempPosts = [...posts];
    switch (sortOption) {
      case "latest":
        tempPosts = posts; // 원래 순서 유지
        break;
      case "popular":
        tempPosts.sort((a, b) => b.likes.length - a.likes.length);
        break;
      case "comments":
        tempPosts.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    setSortedPosts(tempPosts);
  }, [posts, sortOption]);

  if (loading || error) {
    return (
      <section className="w-[934px] mx-auto flex items-center justify-center">
        {loading && <Loading />}
        {error && <p className="text-lg font-medium">{error}</p>}
      </section>
    );
  }

  return (
    <div className="mx-auto w-[934px]">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-[32px] font-bold">{channelName}</h2>
        <SortButton
          currentSort={sortOption}
          onSortChange={(option) => setSortOption(option)}
        />
      </div>
      {posts.length > 0 ? (
        <section className="grid grid-cols-2 gap-10">
          {sortedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 h-[50vh] text-lg text-gray-54">
          <p>아직 작성된 포스트가 없어요...</p>
          <p className="mb-1">이 카테고리의 첫 포스팅을 올려보세요!</p>
          <NewPostButton />
        </div>
      )}
    </div>
  );
}
