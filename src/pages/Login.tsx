import { useState } from "react";
import InputLabel from "../components/common/InputLabel";
import AuthButton from "../components/common/AuthButton";
import Logo from "../assets/Logo";
import { loginApi } from "../api/auth";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: "", isWarning: false });
  const [password, setPassword] = useState({ value: "", isWarning: false });

  const validate = (): boolean => {
    let isValid = true;
    if (!email.value) {
      setEmail({ ...email, isWarning: true });
      isValid = false;
    }
    if (!password.value) {
      setPassword({ ...password, isWarning: true });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await loginApi({
      email: email.value,
      password: password.value,
    });

    if (result) {
      console.log("로그인 성공");
      navigate(-1);
      return;
    } else {
      alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  return (
    <section className="mx-auto flex screen-100vh items-center justify-center p-[70px]">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px]">
        <Logo className="mx-auto w-auto h-[100px] mb-10" />
        <div className="flex flex-col gap-4">
          <InputLabel
            label="이메일"
            id="email"
            type="email"
            value={email.value}
            placeholder="이메일을 입력해주세요"
            isWarning={email.isWarning}
            onChange={(e) =>
              setEmail({ value: e.target.value, isWarning: false })
            }
          />
          <InputLabel
            label="비밀번호"
            id="password"
            type="password"
            value={password.value}
            placeholder="비밀번호를 입력해주세요"
            isWarning={password.isWarning}
            onChange={(e) =>
              setPassword({ value: e.target.value, isWarning: false })
            }
          />
        </div>
        <div className="flex flex-col gap-5 mt-24">
          <AuthButton type="submit" primary>
            로그인
          </AuthButton>
          <AuthButton type="button" onClick={() => navigate("/register")}>
            회원가입 하러가기
          </AuthButton>
        </div>
      </form>
    </section>
  );
}
