export default function NotFound() {
  return (
    <div className="mt-[335px] w-[1440px] h-[1024px] bg-white flex-col justify-start items-center gap-2.5 inline-flex">
      <div className="text-center text-[#fcc404] text-[80px] font-extrabold uppercase leading-[121.60px]">
        404 ERROR
      </div>
      <div className="text-center text-[#222222] text-[40px] font-extrabold leading-[30px]">
        요청하신 페이지를 찾을 수 없습니다.
      </div>
      <button className="mt-[125px] w-[184px] h-[50px] px-[30px] py-2.5 bg-[#fcc404] font-extrabold rounded-[50px] justify-center items-center gap-2.5 inline-flex">
        홈으로 가기
      </button>
    </div>
  );
}
