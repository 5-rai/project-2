export default function AdBanner() {
  return (
    <div>
      <div className="w-[952px] h-[312px] px-[297px] py-[50px] bg-[#1c0c42] flex-col justify-start items-center gap-[18px] inline-flex">
        <a href="https://www.sucoding.kr/">
          <img className="w-[65px] h-[65px]" src="src/assets/sucoding.jpg" />
        </a>
        <div className="self-stretch h-[69px] flex-col justify-center items-center gap-1 flex">
          <div className="whitespace-nowrap text-right text-white text-2xl font-semibold font-['Pretendard'] leading-[38px]">
            수코딩과 함께 코딩 천재로 거듭나세요
          </div>
          <div className="whitespace-nowrap self-stretch text-center text-white text-base font-normal font-['Pretendard'] leading-relaxed">
            수코딩 | 누구나 쉽게 배우는 온라인 코딩 스쿨
          </div>
        </div>
        <div className="justify-start items-start gap-7 inline-flex">
          <div className="px-[18px] py-2 bg-[#6530e3] rounded justify-center items-center gap-2.5 flex">
            <a
              href="https://www.sucoding.kr/"
              className="whitespace-nowrap text-white text-base font-semibold font-['Pretendard'] leading-relaxed"
            >
              수코딩 사이트 바로가기
            </a>
          </div>
          <div className="px-[18px] py-2 bg-[#ff0133] rounded justify-center items-center gap-2.5 flex">
            <a
              href="https://www.youtube.com/channel/UCzA62wwyiLnVnqFP4VEUOZg"
              className="whitespace-nowrap text-white text-base font-semibold font-['Pretendard'] leading-relaxed"
            >
              수코딩 유튜브 바로가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
