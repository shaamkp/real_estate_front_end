import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useBearStore } from "../../zustand/Store";
import { apiConfig } from "../../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

const TenantSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useBearStore((state) => state.userData);
  const [propertyData, setPropertyData] = useState([]);
  const [unit, setUnit] = useState("");
  const [property, setProperty] = useState("");
  const [unitData, setUnitData] = useState([]);

  const fetchPropertyData = () => {
    apiConfig
      .get("property/list-property/", {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((response) => {
        const { app_data } = response.data;
        if (app_data.StatusCode === 6000) {
          setPropertyData(app_data.data);
        }
      });
  };

  const fetchUnitData = () => {
    apiConfig
      .get("property/list-units/", {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((response) => {
        const { app_data } = response.data;
        if (app_data.StatusCode === 6000) {
          setUnitData(app_data.data);
        } else {
          alert(app_data.data.message);
        }
      });
  };

  const assignUnitTenant = () => {
    const formData = new FormData();
    formData.append("unit", unit);
    formData.append("property", property);
    apiConfig
      .post(`accounts/assign-unit-tenant/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((response) => {
        const { app_data } = response.data;
        if (app_data.StatusCode === 6000) {
          navigate("/");
        } else {
          alert(app_data.data.message);
        }
      });
  };

  useEffect(() => {
    fetchPropertyData();
    fetchUnitData();
  }, []);

  return (
    <MainContainer>
      <Wrapper>
        <h1 style={{ textAlign: "center" }}>Assign Tenant</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ContentContainer>
            <DetailDiv>
              <Label>Select Unit</Label>
              <select
                style={{ marginLeft: "10px" }}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="g">-----</option>
                {unitData.map((unit) => (
                  <>
                    <option value={unit.id}>{unit.unit_type}BHK</option>
                  </>
                ))}
              </select>
            </DetailDiv>
            <DetailDiv>
              <Label>Select Property</Label>
              <select
                style={{ marginLeft: "10px" }}
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              >
                <option value="g">-----</option>
                {propertyData.map((property) => (
                  <option value={property.id}>{property.name}</option>
                ))}
              </select>
            </DetailDiv>
          </ContentContainer>
        </div>
        <Submit onClick={() => assignUnitTenant()}>Assign</Submit>
      </Wrapper>
    </MainContainer>
  );
};

export default TenantSingle;

const MainContainer = styled.div``;
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const DetailDiv = styled.div`
  margin-top: 10px;
`;
const Label = styled.label``;
const Submit = styled.label`
  background-color: black;
  color: #fff;
  width: 10%;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  margin: 20px auto;
`;
const ContentContainer = styled.div``;
