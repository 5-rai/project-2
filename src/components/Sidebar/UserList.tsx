import { useRef, useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import SearchIcon from "../../assets/SearchIcon";
import { useAllUserStore } from "../../store/allUserStore";
import { axiosInstance } from "../../api/axios";
import UserNavLink from "./UserNavLink";

export default function UserList() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchName, setSearchName] = useState(""); // 검색할 이름 상태 관리
  const [searchResults, setSearchResults] = useState<User[]>([]); // 검색한 이름의 결과값 상태 관리
  const allUsers = useAllUserStore((state) => state.users);
  const debounceTimeout = useRef<number | null>(null); // 디바운스 타이머 관리

  const toggledInputFocused = () => setIsInputFocused((prev) => !prev);

  // API GET 함수 (검색값 가져오기)
  const fetchUsers = async (searchName: string) => {
    try {
      const response = await axiosInstance.get(`/search/users/${searchName}`);
      setSearchResults(response.data); // 검색 결과 저장
      console.log("유저 찾기 성공🎉", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchName(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // 기존 타이머를 취소
    }

    if (value.trim() !== "") {
      debounceTimeout.current = setTimeout(() => {
        fetchUsers(value); // 0.5초 후 검색 실행
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <section className="grow overflow-y-hidden flex flex-col">
      <h2 className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-4 dark:text-gray-ee">
        유저 {searchResults.length > 0 ? searchResults.length : allUsers.length}{" "}
        명
      </h2>
      <div className="relative mb-4">
        <SearchIcon
          color={
            isInputFocused
              ? "#FCC404"
              : isDarkMode
              ? "rgba(200, 200, 200, 0.5)"
              : "#c8c8c8"
          }
          className="h-4 absolute left-4 top-3 transition-colors"
        />
        <input
          className="group w-full h-10 border border-gray-c8 dark:border-gray-c8/50 rounded-full pl-12 focus:border-primary transition-colors"
          type="text"
          placeholder="유저 검색"
          autoCorrect="off"
          onFocus={toggledInputFocused}
          onBlur={toggledInputFocused}
          value={searchName}
          onChange={handleSearch} // 검색 이벤트 핸들러
        />
      </div>

      <div className="h-full flex flex-col overflow-y-auto gap-2.5 custom-scrollbar">
        {searchResults.length > 0
          ? searchResults.map((user) => (
              <UserNavLink key={user._id} user={user} />
            ))
          : allUsers.map((user) => <UserNavLink key={user._id} user={user} />)}
      </div>
    </section>
  );
}
