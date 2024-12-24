
import { useState } from "react";

const Ex = () => {
  const [content, setContent] = useState(null);
  const [message, setMessage] = useState();

  const onValueChange = (e) => {
    setContent(e.target.value);
		
		//한글 외 다른 입력 패턴을 검사하는 정규식
    const regex = /[a-z0-9]|[\s\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

    if (content && regex.test(content)) {
      setMessage("한글로만 입력해주세요.");
    } else if (content) {
      setMessage("한글으로만 이루어진 입력입니다!");
    }
  };

  return (
    <>
      <input type="text" onChange={onValueChange} />
      {message}
    </>
  );
};

// export default Ex;

// //위 코드를 통해 유효성 검사를 했을때 빈 박스에 한글자만 했을때 setMessage가 뜨지 않는 오류의 발생원인과 해결법

// 이 코드에서 발생하는 문제는 onValueChange 함수에서 content 상태를 갱신하기 전의 content 값을 사용하고 있기 때문입니다. React의 useState는 비동기적으로 동작하므로,
//  setContent(e.target.value)가 호출되더라도 바로 content가 업데이트되지 않습니다. 
//  이로 인해 if (content && regex.test(content)) 조건에서 최신의 content 값이 아닌 이전 상태 값이 사용되어, 
//  입력 첫 글자에 대해 message가 업데이트되지 않는 문제가 발생합니다.

// 해결 방법
// onValueChange 함수에서 최신의 입력값인 e.target.value를 직접 사용하여 조건을 검사합니다.
// content 상태 값 대신 e.target.value를 사용하여 최신 입력을 검사하게 만듭니다.
