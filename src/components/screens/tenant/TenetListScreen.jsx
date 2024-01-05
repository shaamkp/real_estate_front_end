import React, { useEffect, useState } from "react";
import bg from "../../../assets/images/login/login-image.jpeg";
import styled from "styled-components";
import { useBearStore } from "../../zustand/Store";
import { apiConfig } from "../../../axiosConfig";
import { Link } from "react-router-dom";

const TenetListScreen = () => {
  const userData = useBearStore((state) => state.userData);

  const [tenantData, setTenantData] = useState([]);

  const fetchTenantData = () => {
    apiConfig
      .get("accounts/list-tenant-profile/", {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((response) => {
        const { app_data } = response.data;
        if (app_data.StatusCode === 6000) {
          setTenantData(app_data.data);
        } else {
          setTenantData([]);
        }
      });
  };

  useEffect(() => {
    fetchTenantData();
  });

  return (
    <MainContainer>
      <Wrapper>
        <h1>Tenant List</h1>
        <ContentConatiner>
          {tenantData?.map((item) => (
            <Content to={`${item.id}`}>
              <DetailDiv>
                <TitleDiv>Name:</TitleDiv>
                <ContentDiv>{item.name}</ContentDiv>
              </DetailDiv>
              <DetailDiv>
                <TitleDiv>Phone:</TitleDiv>
                <ContentDiv>{item.phone}</ContentDiv>
              </DetailDiv>
              <DetailDiv>
                <TitleDiv>Address:</TitleDiv>
                <ContentDiv>{item.address}</ContentDiv>
              </DetailDiv>
              <DetailDiv>
                <TitleDiv>Agreement end date:</TitleDiv>
                <ContentDiv>{item.agreement_end_date}</ContentDiv>
              </DetailDiv>
              <DetailDiv>
                <TitleDiv>Repayment Date:</TitleDiv>
                <ContentDiv>{item.monthly_rent_date}th Month</ContentDiv>
              </DetailDiv>
              <DetailDiv className="btn">
                <ButtonDiv href={item.adhar_card} download="adhar.pdf">
                  Download Aadhar Card
                </ButtonDiv>
                <ButtonDiv>Download Pan Card</ButtonDiv>
              </DetailDiv>
            </Content>
          ))}
        </ContentConatiner>
      </Wrapper>
    </MainContainer>
  );
};

export default TenetListScreen;

const MainContainer = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const ContentConatiner = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10%;
  margin-top: 30px;
`;
const Content = styled(Link)`
  width: 40.3%;
  border: 1px solid black;
  padding: 5px;
  margin-top: 20px;
  text-decoration: none;
  color: black;
`;
const ImageDiv = styled.div`
  width: 100%;
  img {
    width: 100%;
    display: block;
  }
`;
const DetailDiv = styled.div`
  display: flex;
  margin-top: 20px;
  &.btn {
    gap: 30px;
  }
`;
const TitleDiv = styled.div`
  width: 50%;
`;
const ContentDiv = styled.div`
  width: 50%;
`;
const ButtonDiv = styled.a`
  background-color: black;
  margin-top: 40px;
  color: #fff;
  width: 30%;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
`;
