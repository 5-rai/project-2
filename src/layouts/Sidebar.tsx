import { Outlet, NavLink } from "react-router";
import profileImg from "../assets/profileImg.jpg";
import { useState } from "react";

export default function Sidebar() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const toggledInputFocused = () => setIsInputFocused((prev) => !prev);
  return (
    <>
      <aside className="flex flex-col sticky top-[68px] h-[90vh] w-[300px] min-w-[300px] p-7 gap-16 border-r border-gray-ee">
        <div className="h-[365px]">
          <p className="border-b py-2 border-gray-22 mb-2.5">카테고리</p>
          <div className="flex flex-col gap-2.5">
            {[1, 2, 3, 4, 5, 6].map(() => (
              <NavLink
                to={"/"}
                className={
                  "flex items-center h-11 px-7 py-1 rounded-lg hover:bg-secondary transition-colors"
                }
              >
                K-POP
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          <p className="border-b py-2 border-gray-22 mb-4">접속자 (N명)</p>
          <div>
            <div className="relative mb-4">
              <svg
                width="22"
                height="21"
                className="h-4 absolute left-4 top-3"
                fill="current"
                viewBox="0 0 22 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Icons/16px/Search">
                  <path
                    id="Combined Shape"
                    d="M21.1846 19.1616C21.6051 19.5821 21.6051 20.264 21.1846 20.6846C20.764 21.1051 20.0821 21.1051 19.6616 20.6846L15.8923 16.9153C15.4718 16.4948 15.4718 15.8129 15.8923 15.3923C16.3129 14.9718 16.9948 14.9718 17.4153 15.3923L21.1846 19.1616ZM9.11539 17.2308C4.35724 17.2308 0.5 13.3735 0.5 8.61539C0.5 3.85724 4.35724 0 9.11539 0C13.8735 0 17.7308 3.85724 17.7308 8.61539C17.7308 13.3735 13.8735 17.2308 9.11539 17.2308ZM9.11539 15.0769C12.684 15.0769 15.5769 12.184 15.5769 8.61539C15.5769 5.04678 12.684 2.15385 9.11539 2.15385C5.54678 2.15385 2.65385 5.04678 2.65385 8.61539C2.65385 12.184 5.54678 15.0769 9.11539 15.0769Z"
                    className={
                      isInputFocused ? "fill-primary transition-colors" : ""
                    }
                    fill="current"
                  />
                </g>
              </svg>
              <input
                className="group w-full h-10 border border-gray-c8 rounded-full pl-12 focus:border-primary transition-colors"
                type="text"
                autoCorrect="off"
                onFocus={toggledInputFocused}
                onBlur={toggledInputFocused}
              />
            </div>
            <div className="flex flex-col h-[270px] overflow-y-auto gap-2.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <NavLink
                  to={"/"}
                  className={
                    "flex items-center gap-2.5 px-7 py-2 rounded-lg hover:bg-secondary transition-colors"
                  }
                >
                  <img
                    className="w-7 h-7 rounded-full"
                    src={profileImg}
                    alt="유저 프로필 이미지"
                  />
                  <span>닉네임</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </aside>
      <Outlet />
    </>
  );
}
