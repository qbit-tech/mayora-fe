import React from 'react';
import styled from 'styled-components';

const AuthContentLeftSecondary: React.FC = () => {
	return (
    <Container>
      <HeroImage>
        <img src="/images/bg-login.jpg" width="100%" alt="" />
      </HeroImage>
      <Title>{process.env.REACT_APP_WEBSITE_NAME}</Title>
      <Subtitle>{process.env.REACT_APP_WEBSITE_SUBTITLE}</Subtitle>
    </Container>
  );
}
const Container = styled.div`
	& {
		background-color: ${({theme}) => theme.colors.primary};
		border-radius: 20px;
		margin: 40px;
		padding: 30px;
		color: ${({theme}) => theme.colors.white};
		position: relative;
	}
	&:before {
		content: '';
		background-image: url('/images/dotted.svg');
		background-repeat: no-repeat;
		position: absolute;
		left: 0;
		top: 0;
		width: 80px;
		height: 80px;
	}
`;

const Title = styled.div`
	font-size: ${({theme}) => theme.fontSize.heading};
	font-weight: ${({theme}) => theme.fontWeight.bold};
	margin-top: 20px;
	margin-right: 100px;
`;
const HeroImage = styled.div`
	width: 100%;
	position: relative;
	z-index: 1;
	&:after {
		content: '';
		background-image: url('/images/dotted.svg');
		background-repeat: no-repeat;
		position: absolute;
		right: 50px;
		bottom: -40px;
		width: 80px;
		height: 80px;
	}
`;
const Subtitle = styled.div`
	font-size: ${({theme}) => theme.fontSize.body1};
	margin-top: 20px;
`;

export default AuthContentLeftSecondary;