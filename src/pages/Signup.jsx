// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('이메일은 필수 입력 요소입니다.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: yup
    .string()
    .required('비밀번호는 필수 입력 요소입니다.')
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.'),
  passwordCheck: yup
    .string()
    .required('비밀번호 확인은 필수 입력 요소입니다.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
});

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // 서버 오류 메시지 상태

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigate('/login'); // 회원가입 후 로그인 페이지로 이동
      } else {
        setErrorMessage('회원가입 실패: 이미 사용 중인 이메일이거나 유효하지 않은 정보입니다.');
      }
    } catch (error) {
      setErrorMessage('서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>회원가입 페이지</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input
          type="email"
          placeholder="이메일"
          {...register('email')}
          style={styles.input}
        />
        {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}
        
        <input
          type="password"
          placeholder="비밀번호"
          {...register('password')}
          style={styles.input}
        />
        {errors.password && <p style={styles.errorText}>{errors.password.message}</p>}

        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register('passwordCheck')}
          style={styles.input}
        />
        {errors.passwordCheck && <p style={styles.errorText}>{errors.passwordCheck.message}</p>}
        
        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: isValid ? (isHovered ? '#0056b3' : '#e50914') : '#555',
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
          disabled={!isValid}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          회원가입
        </button>
        {errorMessage && <p style={styles.serverErrorText}>{errorMessage}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#111',
    color: '#fff',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #333',
    backgroundColor: '#222',
    color: '#fff',
    outline: 'none',
    width: '100%',
    maxWidth: '300px',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  serverErrorText: {
    color: 'orange',
    fontSize: '14px',
    marginTop: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    color: '#fff',
    width: '100%',
    maxWidth: '300px',
  },
};

export default Signup;
