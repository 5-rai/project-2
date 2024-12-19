import Bookmark from "../components/Write/Bookmark";
import CategoryButton from "../components/Write/CategoryButton";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getOneYoutubeVideoInfo } from "../api/youtube";
import { createPost, getOnePost, updatePost } from "../api/post";
import { useNavigate, useParams } from "react-router";

const youtubeLinkRegex = /^https:\/\/www\.youtube\.com.*\bv\b/;

export default function Write() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const debounceTimer = useRef(0);

  const [videoInfo, setVideoInfo] = useState<Partial<YoutubeVideoType>>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel>();
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState({
    value: "",
    validUrl: "",
    isWarning: false,
  });

  const handleChange = (value: string) => {
    setYoutubeUrl({
      ...youtubeUrl,
      value,
      isWarning: false,
    });
    createBookmark(value);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const thumbnails = videoInfo!.snippet!.thumbnails;
    const maxResThumbnailURL = getMaxResolutionThumbnail(thumbnails);

    const post = await createPost({
      title: JSON.stringify({
        title,
        contents,
        youtubeUrl: youtubeUrl.validUrl,
        image: maxResThumbnailURL,
      }),
      channelId: selectedChannel!._id,
    });
    navigate(`/channels/${selectedChannel!.name}/${post!._id}`);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postId) return;
    if (!validate()) return;

    const thumbnails = videoInfo!.snippet!.thumbnails;
    const maxResThumbnailURL = getMaxResolutionThumbnail(thumbnails);

    await updatePost({
      title: JSON.stringify({
        title,
        contents,
        youtubeUrl: youtubeUrl.validUrl,
        image: maxResThumbnailURL,
      }),
      channelId: selectedChannel!._id,
      postId,
    });
    navigate(`/channels/${selectedChannel!.name}/${postId}`);
  };

  const getMaxResolutionThumbnail = (thumbnails: ThumbnailsType) => {
    if (thumbnails.maxres) return thumbnails.maxres.url;
    if (thumbnails.standard) return thumbnails.standard.url;
    if (thumbnails.high) return thumbnails.high.url;
    if (thumbnails.medium) return thumbnails.medium.url;
    return thumbnails.default.url;
  };

  const createBookmark = async (url: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      url = url.trim();
      if (!youtubeLinkRegex.test(url)) {
        setYoutubeUrl({ ...youtubeUrl, value: url, isWarning: true });
        setVideoInfo(undefined);
        return;
      }

      const parsedUrl = new URL(url);
      const videoId = new URLSearchParams(parsedUrl.search).get("v");
      const videoInfo = await getOneYoutubeVideoInfo(videoId);

      if (videoInfo) {
        setVideoInfo(videoInfo);
        setYoutubeUrl({
          ...youtubeUrl,
          value: url,
          validUrl: url,
          isWarning: false,
        });
      } else {
        setVideoInfo(undefined);
        setYoutubeUrl({ ...youtubeUrl, isWarning: true });
      }
    }, 500);
  };

  const validate = () => {
    if (!title || !contents || !videoInfo || !selectedChannel) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const setCurrentPostData = async () => {
      const post = await getOnePost(postId);
      if (!post) {
        setError(true);
        return;
      }

      const { title, contents, youtubeUrl }: CustomTitle = JSON.parse(
        post.title
      );
      setTitle(title);
      setContents(contents);
      setSelectedChannel(post.channel);
      setYoutubeUrl({
        value: youtubeUrl,
        validUrl: youtubeUrl,
        isWarning: false,
      });
      createBookmark(youtubeUrl);
    };
    if (postId) setCurrentPostData();
  }, []);

  useEffect(() => {
    if (!title || !contents || !youtubeUrl.value || !selectedChannel) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [title, contents, youtubeUrl, selectedChannel]);

  if (postId && error)
    return (
      <section className="w-full px-16 py-7 flex items-center justify-center">
        <p className="text-gray-54">포스트 정보를 가져오는데 실패했습니다.</p>
      </section>
    );

  return (
    <section className="w-full px-16 py-7">
      <form
        onSubmit={postId ? handleEditSubmit : handleCreateSubmit}
        className="flex flex-col gap-4"
      >
        <CategoryButton
          channel={selectedChannel}
          setChannel={setSelectedChannel}
        />
        <input
          value={title}
          className="border px-6 py-3 focus:border-primary text-xl border-gray-c8 dark:border-gray-c8/50 rounded-lg"
          placeholder="제목을 입력해주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="border focus-within:border-primary rounded-lg border-gray-c8 dark:border-gray-c8/50 overflow-hidden p-6 pr-2 bg-white dark:bg-white/10">
          <textarea
            value={contents}
            className="w-full h-[280px] resize-none bg-transparent overflow-y-scroll custom-scrollbar"
            placeholder="내용을 입력해주세요"
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div>
          <input
            type="url"
            value={youtubeUrl.value}
            className={twMerge(
              "border focus:border-primary rounded-lg w-full py-3 px-5 dark:border-gray-c8/50",
              youtubeUrl.isWarning ? "border-red-accent" : "border-gray-c8"
            )}
            placeholder="유튜브 URL을 입력해주세요"
            autoCorrect="off"
            onPaste={(e) => createBookmark(e.clipboardData.getData("text"))}
            onChange={(e) => handleChange(e.target.value)}
          />
          {youtubeUrl.isWarning && (
            <p className="text-xs leading-7 text-red-accent">
              올바른 유튜브 URL을 입력해주세요.
            </p>
          )}
        </div>
        {videoInfo && (
          <Bookmark
            title={videoInfo.snippet!.title}
            description={videoInfo.snippet!.description}
            url={youtubeUrl.validUrl}
            thumbnail={getMaxResolutionThumbnail(videoInfo.snippet!.thumbnails)}
          />
        )}
        <button
          disabled={isDisabled}
          className="primary-btn self-end h-[50px] w-[157px] rounded-lg flex justify-center items-center"
        >
          {postId ? "포스팅 수정하기" : "포스팅 올리기"}
        </button>
      </form>
    </section>
  );
}
