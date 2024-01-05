import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropertyList from "./PropertyList";
import CreatePropertyFormModal from "../modals/CreatePropertyFormModal";
import CreateTenantFormModal from "../modals/CreateTenantFormModal";
import { apiConfig } from "../../../axiosConfig";
import { useBearStore } from "../../zustand/Store";
import { Link } from "react-router-dom";

const Home = () => {
  const userData = useBearStore((state) => state.userData);
  const [addPropertyModal, setPropertyModal] = useState(false);
  const [addTenantModal, setTenantModal] = useState(false);
  const [search, setSerach] = useState("");
  const [propertyData, setPropertyData] = useState([]);

  const fetchPropertyData = () => {
    apiConfig
      .get("property/list-property/", {
        params: {
          q: search,
        },
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

  useEffect(() => {
    fetchPropertyData();
  }, [search]);

  return (
    <MainConatiner>
      <Wrapper>
        <ContentContainer>
          <CreatePropertyButton onClick={() => setPropertyModal(true)}>
            Create Property
          </CreatePropertyButton>
          <CreatePropertyButton onClick={() => setTenantModal(true)}>
            Create Tenant
          </CreatePropertyButton>
          <CreatePropertyButton to="/tenant">Tenant</CreatePropertyButton>
          <InputDiv>
            <input
              type="text"
              placeholder="Serach here"
              onChange={(e) => setSerach(e.target.value)}
            />
          </InputDiv>
        </ContentContainer>
        <MiddleContentContainer>
          <PropertyList propertyData={propertyData} />
        </MiddleContentContainer>
        <CreatePropertyFormModal
          setPropertyModal={setPropertyModal}
          addPropertyModal={addPropertyModal}
          fetchPropertyData={fetchPropertyData}
        />
        <CreateTenantFormModal
          addTenantModal={addTenantModal}
          setTenantModal={setTenantModal}
        />
      </Wrapper>
    </MainConatiner>
  );
};

export default Home;

const MainConatiner = styled.div`
  width: 100%;
  height: 100vh;
`;
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
`;
const CreatePropertyButton = styled(Link)`
  background-color: black;
  color: #fff;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
`;
const MiddleContentContainer = styled.div`
  margin-top: 20px;
`;
const RouteContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
const RouteButton = styled.div`
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
`;
const InputDiv = styled.div`
  input {
    width: 100%;
    padding: 3%;
  }
`;
