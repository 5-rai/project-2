import { Fragment, useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { Link } from "react-router";
import UserAvatar from "../components/common/UserAvatar";
import RecentPosts from "../components/Home/RecentPosts";
import { useAllUserStore } from "../store/allUserStore";
import { useChannelStore } from "../store/channelStore";
import SucodingAd from "../components/Home/SucodingAd";
import IndistreetAd from "../components/Home/IndistreetAd";

export default function Home() {
  const users = useAllUserStore((state) => state.users);
  const channels = useChannelStore((state) => state.channels);
  const [channelPosts, setChannelPosts] = useState<
    Record<string, ChannelPosts>
  >({}); // 채널별 포스트 저장

  const channelIds = channels.slice(0, 10).map((channel: Channel) => ({
    id: channel._id,
    name: channel.name,
  }));

  // 채널별 포스트 목록 가져오기
  const fetchPostsForChannels = async () => {
    const results: Record<string, ChannelPosts> = {};
    await Promise.all(
      channelIds.map(async (channel) => {
        try {
          const response = await axiosInstance.get(
            `/posts/channel/${channel.id}`
          );
          const sortedPosts = response.data
            .sort(
              (a: Post, b: Post) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 4);
          results[channel.id] = { posts: sortedPosts, name: channel.name };
        } catch (error) {
          console.error("포스트 가져오기 실패:", error);
          results[channel.id] = { posts: [], name: channel.name };
        }
      })
    );
    setChannelPosts(results);
  };

  useEffect(() => {
    if (channelIds.length > 0) {
      fetchPostsForChannels();
    }
  }, [channels]);

  // 랜덤 아티스트 추출
  const getRandomArtists = (arr: User[], count: number) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const randomArtists = getRandomArtists(users, 5);

  return (
    <div className="mx-auto py-10 flex-col justify-start flex w-[952px] gap-24 overflow-y-auto">
      {/* 금주의 아티스트 */}
      <section>
        <div className="mb-3">
          <span className="text-2xl font-semibold">금주의 </span>
          <span className="text-highlight text-2xl font-semibold">
            아티스트
          </span>
        </div>
        <div className="flex flex-wrap justify-between px-2">
          {randomArtists.map((artist) => (
            <Link to={`/user/${artist._id}`} key={artist._id}>
              <UserAvatar name={artist.fullName} image={artist.image} />
            </Link>
          ))}
        </div>
      </section>

      {/* 채널별 섹션 및 광고 */}
      {Object.entries(channelPosts)
        .sort()
        .map(([channelId, { posts, name }]: [string, ChannelPosts], index) => (
          <Fragment key={`recent-${channelId}`}>
            {/* 채널 섹션 */}
            <section>
              <div className="mb-3">
                <span className="text-2xl font-semibold">최근 </span>
                <span className="text-primary text-2xl font-semibold">
                  {name}
                </span>
                <span className="text-2xl font-semibold"> 포스트</span>
              </div>
              <div className="flex flex-wrap gap-10">
                {posts.length > 0 ? (
                  posts
                    .filter((post: Post) => post.title.includes("{")) // 중괄호 포함된 title만 필터링
                    .map((post: Post) => {
                      const parsedTitle = JSON.parse(post.title);
                      const postData = {
                        title: parsedTitle.title,
                        description: parsedTitle.contents,
                        imageUrl: parsedTitle.image || "/logo.png",
                        avatarImg: post.author?.image || "/logo.png",
                        channelName: name,
                        postId: post._id,
                        userId: post.author?._id ?? "",
                        userName: post.author?.fullName ?? "",
                      };

                      return <RecentPosts key={post._id} post={postData} />;
                    })
                ) : (
                  <p>등록 되어있는 포스트가 없습니다...🫠</p>
                )}
              </div>
            </section>
            {index === 2 && <SucodingAd />}
          </Fragment>
        ))}
      <IndistreetAd />
    </div>
  );
}
