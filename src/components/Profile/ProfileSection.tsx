import { Link } from "react-router";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ProfileSectionProps {
  user: User | null;
  isMyProfile?: boolean;
}

export default function ProfileSection({
  user,
  isMyProfile = false,
}: ProfileSectionProps) {
  const [isFollow, setIsFollow] = useState(false);

  return (
    <article className="border-b border-gray-ee dark:border-gray-ee/50 flex justify-center items-center gap-20 mb-10 p-10 w-full">
      <div className="flex flex-col gap-2 items-center">
        <img
          src={user?.image || "/logo.png"}
          alt="프로필 이미지"
          className="w-[124px] h-[124px] rounded-full profile-shadow border border-gray-ee bg-white/20"
        />
        <p className="text-lg mt-[10px] dark:text-white">{user?.fullName}</p>
      </div>
      <section className="w-max">
        <div className="flex w-[208px] justify-between mb-4">
          <div className="text-center">
            <p className="text-xl">{user?.posts.length}</p>
            <p className="text-lg">게시물</p>
          </div>
          <div className="text-center">
            <p className="text-xl">{user?.followers.length}</p>
            <p className="text-lg">팔로워</p>
          </div>
          <div className="text-center">
            <p className="text-xl">{user?.following.length}</p>
            <p className="text-lg">팔로잉</p>
          </div>
        </div>
        {isMyProfile ? (
          <div className="flex gap-[10px]">
            <Link to="/mypage/edit" className="w-full">
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-lg text-sm"
              >
                프로필 수정
              </button>
            </Link>
            <Link to="/mypage/edit/password" className="w-full">
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-lg text-sm"
              >
                비밀번호 변경
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-[10px]">
            <button
              type="button"
              className={twMerge(
                "w-full py-1 rounded-lg text-sm",
                isFollow ? "secondary-btn" : "primary-btn"
              )}
              onClick={() => setIsFollow((prev) => !prev)}
            >
              {isFollow ? "언팔로우" : "팔로우"}
            </button>
            <button
              type="button"
              className="primary-btn w-full py-1 rounded-lg text-sm"
            >
              메세지 보내기
            </button>
          </div>
        )}
      </section>
    </article>
  );
}
