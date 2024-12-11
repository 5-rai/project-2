export default function RecentPosts({
  artist,
  songTitle,
  youtubeTitle,
  youtubeThumbnail,
  avatarImg,
}: {
  artist: string;
  songTitle: string;
  youtubeTitle: string;
  youtubeThumbnail: string;
  avatarImg: string;
}) {
  return (
    <div className="border-t-[24px] border-t-transparent w-[208px] h-[276px] rounded-lg flex-col justify-start items-start inline-flex">
      <div className="h-[178px] relative bg-gradient-to-b from-black to-black rounded-tl-lg rounded-tr-lg border-r border-[#ededed]">
        <img src={youtubeThumbnail} />
        <div className="left-[8px] top-[146px] absolute justify-start items-end gap-3 inline-flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6" src={avatarImg} />
          </div>
          <div className="text-gray-c8 text-sm font-medium leading-snug">
            avatar
          </div>
        </div>
      </div>
      <div className="self-stretch h-[98px] p-2 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-[#ededed] flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch text-[#222222] text-base font-semibold uppercase leading-[30px]">
          {`${artist}-${songTitle}`}
        </div>
        <div className="self-stretch text-[#c8c8c8] text-sm font-normal uppercase leading-snug">
          {youtubeTitle}
        </div>
      </div>
    </div>
  );
}
