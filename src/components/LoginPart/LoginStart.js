import React, {useState}from 'react';
import LoginStyle from './Login.module.css';
import google from './img/ico-google.png';
import naver from './img/ico-naver.png';
import kakao from './img/ico-kakao.png';
import logo from '../../components/LoginPart/img/Group 345.png';
import planet from '../../planet/high.json';
import Lottie from 'react-lottie';
import Google from './Google';
import Kakao from './Kakao';
import Naver from './Naver';

function Login() {

    const lottieOptions = {
        animationData: planet,   
        loop: true,        
        autoplay: true,   
        rendererSettings: {
        className: 'add-class', // svg에 적용
        preserveAspectRatio: 'xMidYMid slice'
        }
    };


	
    return (
    <section className={LoginStyle.content}>
        <div className={LoginStyle.container}>
        <img src={logo} className={LoginStyle.logo} alt="로고"/>

        <div className={LoginStyle.planet}>
        <Lottie 
				options={lottieOptions}
				isClickToPauseDisabled={false}
				style={{width: '400px', height: '400px',
            }} // svg의 부모 div에 적용
				eventListeners={[
					{
						eventName: 'complete',
						callback: () => console.log('the animation completed'),
					},
				]}
		/>
        
            </div>


        <p>
        지구를 위한 건강한 소비생활 <br/>
        지금 플랜잇과 시작해볼까요? 🌱
        </p>
        </div>
        <div className={LoginStyle.login}>
            <p >아이디와 비밀번호 없이 간편하게 로그인할 수 있어요</p>
            <Google className={LoginStyle.google}></Google>
            <Kakao className={LoginStyle.kakao}></Kakao>    
        </div>
    </section>
    );
}

export default Login
