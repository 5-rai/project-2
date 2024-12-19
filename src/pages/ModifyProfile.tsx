import { Link, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import ModifyProfileInput from "../components/ModifyProfile/ModifyProfileInput";
import { updateUser } from "../api/user";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";

export default function ModifyProfile() {
  const { showToast } = useToastStore();
  const [selectedImage, setSelectedImage] = useState<SelectedImage>();
  const [fullName, setFullName] = useState("");
  const [warning, setWarning] = useState({
    isWarning: false,
    errorMessage: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultImgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const defaultProfileImg = "/logo.png";

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      if (user.image) setSelectedImage({ src: user.image, file: null });
      else selectDefaultImage();
    }
  }, []);

  // 이름 변경 핸들러
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setWarning((prev) => ({ ...prev, isWarning: false }));
  };

  // 이미지 업로드 핸들러 (미리 상태만 변경)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setSelectedImage({ src: fileURL, file }); // 로컬 이미지 미리 보기
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 삭제 핸들러 (logo.png로 설정)
  const handleImageDelete = () => {
    selectDefaultImage();
  };

  const selectDefaultImage = async () => {
    const response = await fetch("/logo.png");
    const blob = await response.blob();
    const file = new File([blob], "default-profile.png", { type: blob.type });
    setSelectedImage({ src: defaultProfileImg, file });
  };

  // 프로필 수정 요청 함수 (수정 버튼 클릭 시만 서버에 반영)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setWarning({
        isWarning: true,
        errorMessage: "공백만 있는 이름은 사용할 수 없습니다.",
      });
      return;
    }
    if (fullName.length > 7) {
      setWarning({
        isWarning: true,
        errorMessage: "이름은 최대 7자까지만 입력할 수 있습니다.",
      });
      return;
    }
    if (!selectedImage) return;

    const result = await updateUser(
      selectedImage.src !== user?.image ? selectedImage : null,
      fullName !== user?.fullName ? fullName.trim() : null
    );
    if (result) showToast("프로필이 수정되었습니다.", 3000);
    navigate("/mypage");
  };

  return (
    <section className="mx-auto flex flex-col items-center justify-center">
      {/* 프로필 이미지 수정 */}
      <div className="flex flex-col items-center">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <input
            ref={defaultImgRef}
            type="file"
            src={defaultProfileImg}
            hidden
          />
          <div className="flex items-center justify-center overflow-hidden w-[298px] h-[298px] mb-5 rounded-full profile">
            <img
              src={selectedImage?.src ?? defaultProfileImg}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="imgModifyBtn gap-5">
          <button
            type="button"
            className="px-5 py-2 mr-5 rounded-lg primary-btn font-medium"
            onClick={handleButtonClick}
          >
            이미지 선택
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-[#E7E7E7] hover:bg-gray-c8 dark:text-gray-22 font-medium"
            onClick={handleImageDelete}
          >
            이미지 삭제
          </button>
        </div>
      </div>

      {/* 프로필 정보 수정 */}
      <form className="mt-8" onSubmit={handleSubmit}>
        <ModifyProfileInput
          label="이름"
          type="text"
          id="username"
          value={fullName}
          onChange={handleFullNameChange} // 이름 변경 핸들러 연결
          placeholder="이름을 입력해주세요 (7자 이내)"
          message={warning.errorMessage}
          isWarning={warning.isWarning}
        />
        <div className="flex flex-col gap-5 mt-24">
          <button
            type="submit"
            className="w-[400px] py-2 rounded-[50px] primary-btn"
            disabled={!fullName}
          >
            수정
          </button>
          <Link to="/mypage">
            <button
              type="button"
              className="w-[400px] py-2 rounded-[50px] secondary-btn"
            >
              취소
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
}
