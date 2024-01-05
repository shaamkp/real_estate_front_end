import React, { useState } from "react";
import { styled } from "styled-components";
import logo from "../../../assets/images/login/login-image.jpeg";
import { useBearStore } from "../../zustand/Store";
import { apiConfig } from "../../../axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateUserData = useBearStore((state) => state.updateUserData);

  const handleLogin = () => {
    apiConfig
      .post("accounts/chief-login/", {
        email: email,
        password: password,
      })
      .then(function (response) {
        const { app_data, data } = response.data;
        if (app_data.StatusCode === 6000) {
          updateUserData(email, true, app_data.data.access.access);
        }
      });
  };

  return (
    <Container>
      <Wrapper>
        <Content>
          <Left></Left>
          <Right>
            <Form>
              <Title>LOGIN</Title>
              <Subtitle>Please enter your user name and password</Subtitle>
              <Input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Cover>
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Cover>
              <Button
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </Button>
            </Form>
          </Right>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  height: 100vh;
`;
const Wrapper = styled.div``;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
`;
const Left = styled.div`
  background: url(${logo});
  width: 50%;
  background-size: cover;
`;
const Logo = styled.div`
  width: 20%;
  margin: 100px 0 0 150px;
`;
const Right = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.div`
  width: 40%;
  margin: 0 auto;
  @media all and (max-width: 1440px) {
    width: 50%;
  }
`;
const Title = styled.h2`
  color: var(--blue);
  font-family: "mont-medium";
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;
`;
const Subtitle = styled.p`
  color: var(--blue);
  font-size: 14px;
  font-family: "mont-regular";
  text-align: center;
  margin-bottom: 40px;
`;
const Input = styled.input`
  height: 50px;
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 30px;
  margin-bottom: 20px;
`;
const Cover = styled.div`
  position: relative;
`;
const Button = styled.div`
  background-color: black;
  color: #fff;
  height: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
const Eye = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
  top: 15px;
`;
