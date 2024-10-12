import { useRef } from "react";
import "../form.styles.css";

export function UncontrolledForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // 이메일과 비밀번호 값을 ref를 통해 가져옴
    const email = emailRef.current.value; // 이메일 값
    const password = passwordRef.current.value; // 비밀번호 값

    // 가져온 값을 alert로 표시
    alert(`이메일: ${email}\n비밀번호: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이메일:
        <input type="email" ref={emailRef} />
      </label>
      <label>
        비밀번호:
        <input type="password" ref={passwordRef} />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
