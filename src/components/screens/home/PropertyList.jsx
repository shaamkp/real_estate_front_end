import React from "react";
import bg from "../../../assets/images/login/login-image.jpeg";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { apiConfig } from "../../../axiosConfig";
import { useBearStore } from "../../zustand/Store";

const PropertyList = ({ propertyData }) => {
  return (
    <MainContainer>
      <ContentConatiner>
        {propertyData?.map((item) => (
          <Content to={`${item.id}`}>
            <ImageDiv>
              <img src={item.image} alt="Image" />
            </ImageDiv>
            <DetailDiv>
              <h4>{item.name}</h4>
              <p>{item.address}</p>
              <p>{item.location}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: item?.features,
                }}
              />
            </DetailDiv>
            <UnitsDiv>
              <h5>Units</h5>
              <ul>
                {item.unit?.map((unit_item) => (
                  <li>{unit_item.unit_type}BHK</li>
                ))}
              </ul>
            </UnitsDiv>
          </Content>
        ))}
      </ContentConatiner>
    </MainContainer>
  );
};

export default PropertyList;

const MainContainer = styled.div`
  width: 100%;
`;
const ContentConatiner = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10%;
`;
const Content = styled(Link)`
  width: 33.3%;
  text-decoration: none;
`;
const ImageDiv = styled.div`
  width: 100%;
  img {
    width: 100%;
    display: block;
  }
`;
const DetailDiv = styled.div``;
const UnitsDiv = styled.div``;
