import React from 'react';
import styled from 'styled-components';

const AuthContentLeft: React.FC = () => {
	return (
    <Container>
      <Wrapper>
        <Title>{process.env.REACT_APP_WEBSITE_NAME}</Title>
      </Wrapper>
      <HeroContent>
        <HeroImage src="/images/bg-login.jpg" />
      </HeroContent>
      <HeroContent>
        <Subtitle>{process.env.REACT_APP_WEBSITE_SUBTITLE}</Subtitle>
      </HeroContent>
    </Container>
  );
}
const Container = styled.div`
	& {
		background-color: ${({theme}) => theme.colors.primary};
		border-radius: 20px;
		margin: 40px;
		padding: 30px;
		margin-right: 90px;
		color: ${({theme}) => theme.colors.white};
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	&:before {
		content: '';
		background-image: url('/images/dotted.svg');
		background-repeat: no-repeat;
		position: absolute;
		right: -30px;
		top: 30px;
		width: 80px;
		height: 80px;
	}
	&:after {
		content: '';
		background-image: url('/images/dotted.svg');
		background-repeat: no-repeat;
		position: absolute;
		left: 30px;
		bottom: 30px;
		width: 80px;
		height: 80px;
	}
`;
const Wrapper = styled.div`
	margin-right: -80px;
`;
const Title = styled.div`
	font-size: ${({theme}) => theme.fontSize.heading};
	font-weight: ${({theme}) => theme.fontWeight.bold};
`;
const HeroContent = styled.div`
	margin-left: 100px;
	margin-right: -80px;
`;
const HeroImage = styled.img`
	margin: 50px 0;
	width: 100%;
`;
const Subtitle = styled.div`
	margin-bottom: 40px;
	margin-right: 80px;
	font-size: ${({theme}) => theme.fontSize.body1};
`;

export default AuthContentLeft;