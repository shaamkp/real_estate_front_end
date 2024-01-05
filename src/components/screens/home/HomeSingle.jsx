import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiConfig } from "../../../axiosConfig";
import { useParams } from "react-router-dom";
import { useBearStore } from "../../zustand/Store";

const HomeSingle = () => {
  const userData = useBearStore((state) => state.userData);
  const [propertyData, setPropertyData] = useState([]);
  const { id } = useParams();
  console.log(id, "=========id");

  const handlePropertyData = () => {
    apiConfig
      .get(`property/property-profile-view/${id}/`, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((response) => {
        setPropertyData(response.data.app_data.data);
      });
  };

  useEffect(() => {
    handlePropertyData();
  }, []);
  return (
    <div>
      <MainContainer>
        <ImageDiv>
          <img src={propertyData?.image} alt="Image" />
        </ImageDiv>
        <Wrapper>
          <ContentDiv>
            <Content>
              <h3>Property</h3>
              <DetailDiv>
                <Label>Property Name : </Label>
                <p>{propertyData?.name}</p>
              </DetailDiv>
              <DetailDiv>
                <Label>Property Adress : </Label>
                <p>{propertyData?.address}</p>
              </DetailDiv>
              <DetailDiv>
                <Label>Property Feature : </Label>
                <p
                  dangerouslySetInnerHTML={{
                    __html: propertyData?.address,
                  }}
                />
              </DetailDiv>
            </Content>

            <Content>
              <h3>Unit</h3>
              <>
                {propertyData?.unit?.map((item) => (
                  <UnitContentDiv>
                    <UnitsDiv>
                      <UnitType>{item.unit_type}Bhk</UnitType>
                      <UnitType>{item.rent}rs</UnitType>
                    </UnitsDiv>
                    <AssignedTenantDiv>
                      <h3>Assigned Tenant Details</h3>
                      <AssignedTenantDivContent>
                        {item?.assigned_tenant?.length > 0
                          ? item?.assigned_tenant.map((tenant) => (
                              <>
                                <TenantDiv>
                                  {tenant.name}
                                  <br /> {tenant.phone}
                                  <br /> {tenant.address}
                                  <br />
                                  {tenant.agreement_end_date}
                                  <br />
                                  {tenant.monthly_rent_date}
                                  <br />
                                </TenantDiv>
                              </>
                            ))
                          : ""}
                      </AssignedTenantDivContent>
                    </AssignedTenantDiv>
                  </UnitContentDiv>
                ))}
              </>
            </Content>
          </ContentDiv>
        </Wrapper>
      </MainContainer>
    </div>
  );
};

export default HomeSingle;

const MainContainer = styled.div``;
const Content = styled.div`
  width: 100%;
  text-decoration: none;
`;
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const ContentDiv = styled.div`
  margin: 20px 20px;
`;
const ImageDiv = styled.div`
  width: 100%;
  height: 500px;
  img {
    width: 100%;
    height: 500px;
    display: block;
  }
`;
const DetailDiv = styled.div`
  display: flex;
  align-items: center;
`;
const UnitsDiv = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const UnitType = styled.span``;
const UnitDetail = styled.div`
  color: #fff;
  background: black;
`;
const AssignedTenantDiv = styled.div`
  width: 100%;
  padding: 5px;
  overflow: scroll;
  height: 200px;
`;
const UnitContentDiv = styled.div`
  width: 100%;
  margin-top: 20%;
  display: flex;
  gap: 30px;
  &::first-child {
    margin-top: 0px;
  }
`;
const Label = styled.label``;
const AssignedTenantDivContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const TenantDiv = styled.div`
  height: 200px;
  width: 25.3%;
  color: #fff;
  background: black;
  display: flex;
  justify-content: space-between;
  gap: 60px;
  flex-direction: column;
`;
