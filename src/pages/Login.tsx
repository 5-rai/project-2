import { useState } from "react";
import InputLabel from "../components/common/InputLabel";
import Logo from "../assets/logo.svg";
import AuthButton from "../components/common/AuthButton";

export default function Login() {
  const [email, setEmail] = useState({ value: "", isWarning: false });
  const [password, setPassword] = useState({ value: "", isWarning: false });

  const validate = () => {
    if (!email.value) {
      setEmail({ ...email, isWarning: true });
    }
    if (!password.value) {
      setPassword({ ...password, isWarning: true });
    }

    if (!email.value || !password.value) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(email, password); // TODO: 로그인 API 연동
  };

  return (
    <section className="flex min-h-screen items-center justify-center p-[70px]">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px]">
        <img
          src={Logo}
          alt="로고"
          className="mx-auto w-[100px] h-[100px] mb-10"
        />
        <div className="flex flex-col gap-[10px]">
          <InputLabel
            label="이메일"
            id="email"
            type="email"
            value={email.value}
            message="이메일을 입력해주세요"
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
            message="비밀번호를 입력해주세요"
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
          <AuthButton type="button">회원가입 하러가기</AuthButton>
        </div>
      </form>
    </section>
  );
}
