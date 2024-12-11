import AdBanner from "../components/Home/AdBanner";
import RecentPosts from "../components/Home/RecentPosts";
import WeeklyArtist from "../components/Home/WeeklyArtist";

export default function Home() {
  return (
    <div className="border-t-[63px] border-t-transparent px-[94px] flex-col justify-start items-start inline-flex">
      <div>
        <span className="text-black text-2xl font-semibold leading-[38.88px]">
          금주의{" "}
        </span>
        <span className="text-[#f38304] text-2xl font-semibold  leading-[38.88px]">
          아티스트
        </span>
      </div>

      <div className=" w-[952px] flex flex-wrap justify-between">
        <WeeklyArtist
          name="음악하는 다람쥐"
          images="src/assets/profileImg.jpg"
        />
        <WeeklyArtist
          name="음악하는 다람쥐"
          images="src/assets/profileImg.jpg"
        />
        <WeeklyArtist
          name="음악하는 다람쥐"
          images="src/assets/profileImg.jpg"
        />
        <WeeklyArtist
          name="음악하는 다람쥐"
          images="src/assets/profileImg.jpg"
        />
        <WeeklyArtist
          name="음악하는 다람쥐"
          images="src/assets/profileImg.jpg"
        />
      </div>

      <div className="border-t-[100px] border-t-transparent">
        <span className="text-black text-2xl font-semibold  leading-[38.88px]">
          최근{" "}
        </span>
        <span className="text-[#fcc404] text-2xl font-semibold leading-[38.88px]">
          K-POP
        </span>
        <span className="text-black text-2xl font-semibold leading-[38.88px]">
          {" "}
          포스트
        </span>
      </div>

      <div className="w-[952px] flex flex-wrap justify-between">
        <RecentPosts
          artist="이무진"
          songTitle="청춘만화(COVER)"
          youtubeTitle="유튜브 영상 제목"
          youtubeThumbnail="/src/assets/Thumbnail.jpg"
          avatarImg="/src/assets/profileImg.jpg"
        />
        <RecentPosts
          artist="이무진"
          songTitle="청춘만화(COVER)"
          youtubeTitle="유튜브 영상 제목"
          youtubeThumbnail="/src/assets/Thumbnail.jpg"
          avatarImg="/src/assets/profileImg.jpg"
        />
        <RecentPosts
          artist="이무진"
          songTitle="청춘만화(COVER)"
          youtubeTitle="유튜브 영상 제목"
          youtubeThumbnail="/src/assets/Thumbnail.jpg"
          avatarImg="/src/assets/profileImg.jpg"
        />
        <RecentPosts
          artist="이무진"
          songTitle="청춘만화(COVER)"
          youtubeTitle="유튜브 영상 제목"
          youtubeThumbnail="/src/assets/Thumbnail.jpg"
          avatarImg="/src/assets/profileImg.jpg"
        />
      </div>

      <div className="border-t-[100px] border-t-transparent">
        <span className="text-black text-2xl font-semibold leading-[38.88px]">
          최근{" "}
        </span>
        <span className="text-[#fcc404] text-2xl font-semibold  leading-[38.88px]">
          인디음악
        </span>
        <span className="text-black text-2xl font-semibold leading-[38.88px]">
          {" "}
          포스트
        </span>
      </div>

      <div className="w-[952px] flex flex-wrap justify-between">
        <RecentPosts
          artist="이무진"
          songTitle="청춘만화(COVER)"
          youtubeTitle="유튜브 영상 제목"
          youtubeThumbnail="/src/assets/Thumbnail.jpg"
          avatarImg="/src/assets/profileImg.jpg"
        />

        <RecentPosts
          artist="이무진"
          songTitle="청춘만화(COVER)"
          youtubeTitle="유튜브 영상 제목"
          youtubeThumbnail="/src/assets/Thumbnail.jpg"
          avatarImg="/src/assets/profileImg.jpg"
        />
        <RecentPosts
          artist="이무진"
          songTitle="청춘만화(COVER)"
          youtubeTitle="유튜브 영상 제목"
          youtubeThumbnail="/src/assets/Thumbnail.jpg"
          avatarImg="/src/assets/profileImg.jpg"
        />
        <RecentPosts
          artist="이무진"
          songTitle="청춘만화(COVER)"
          youtubeTitle="유튜브 영상 제목"
          youtubeThumbnail="/src/assets/Thumbnail.jpg"
          avatarImg="/src/assets/profileImg.jpg"
        />
      </div>

      <div className="border-t-[100px] border-t-transparent">
        <AdBanner />
      </div>
    </div>
  );
}
