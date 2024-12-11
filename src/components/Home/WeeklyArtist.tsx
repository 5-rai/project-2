export default function WeeklyArtist({
  name,
  images,
}: {
  name: string;
  images: string;
}) {
  return (
    <div className="border-t-[24px] border-t-transparent h-[162px] justify-between items-start inline-flex">
      <div className="w-[122px] relative">
        <img
          className="w-[122px] h-[122px] left-0 top-0 absolute rounded-full shadow"
          src={images}
        />
        <div className="w-[122px] h-[30px] left-0 top-[132px] absolute justify-start items-center gap-[30px] inline-flex">
          <div className="whitespace-nowrap w-[261px] text-[#222222] text-lg font-normal uppercase leading-[30px]">
            {name}
          </div>
        </div>
      </div>
    </div>
  );
}
