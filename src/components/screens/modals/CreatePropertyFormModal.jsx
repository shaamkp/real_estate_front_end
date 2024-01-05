import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiConfig } from "../../../axiosConfig";
import { useBearStore } from "../../zustand/Store";

const CreatePropertyFormModal = ({
  setPropertyModal,
  addPropertyModal,
  fetchPropertyData,
}) => {
  const userData = useBearStore((state) => state.userData);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [features, setFeatures] = useState("");
  const [image, setImage] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [unitData, setUnitData] = useState([]);

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
        }
      });
  };

  useEffect(() => {
    fetchUnitData();
  }, [addPropertyModal]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedIds((prevItems) => [...prevItems, id]);
    } else {
      setSelectedIds((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const handleFeature = (value) => {
    setFeatures(value);
  };

  const addProperty = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("location", location);
    formData.append("features", features);
    formData.append("image", image);

    for (let i = 0; i < selectedIds.length; i++) {
      formData.append("unit_ids", selectedIds[i]);
    }

    apiConfig
      .post("property/create-property/", formData, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((response) => {
        const { app_data } = response.data;
        if (app_data.StatusCode === 6000) {
          setPropertyModal(false);
          fetchPropertyData();
        }
      });
  };

  return (
    <Cover>
      <Container className={addPropertyModal ? "active" : ""}>
        <Overlay onClick={() => setPropertyModal(false)}></Overlay>
        <Modal>
          <Form onSubmit={(e) => addProperty(e)}>
            <FieldDiv>
              <LabelDiv>
                <Label>Name :</Label>
              </LabelDiv>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>address :</Label>
              </LabelDiv>
              <input
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>location :</Label>
              </LabelDiv>
              <input
                type="text"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>features :</Label>
              </LabelDiv>
              <input
                type="text"
                placeholder="Features"
                onChange={(e) => setFeatures(e.target.value)}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>Image :</Label>
              </LabelDiv>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FieldDiv>

            <FieldDiv>
              {unitData?.map((item) => (
                <>
                  <CheckBoxInput
                    type="checkbox"
                    value={item.id}
                    id={item.id}
                    onChange={handleCheckboxChange}
                    checked={selectedIds.includes(item.id.toString())}
                  />
                  <LabelDiv>
                    <Label>{item.unit_type}BHK</Label>
                  </LabelDiv>
                </>
              ))}
            </FieldDiv>

            <FieldDiv>
              <input type="submit" className="button" />
            </FieldDiv>
          </Form>
        </Modal>
      </Container>
    </Cover>
  );
};

export default CreatePropertyFormModal;

const Cover = styled.div``;
const Container = styled.div`
  position: fixed;
  transition: 0.3s;
  transform: scale(0, 0);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0px;
  &.active {
    transform: scale(1, 1);
    backdrop-filter: blur(4px);
  }
`;
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0px;
  width: 100%;
  z-index: 1000;
  min-height: 100vh;
  max-height: 100vh;
  filter: blur(1px);
`;
const Modal = styled.div`
  width: 70%;
  max-width: 736px;
  max-height: 100vh;
  height: 50vh;
  position: absolute;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.5s;
  z-index: 1000;
  border: 1px solid #fff;
  background: #fff;
  border-radius: 5px;
  overflow-y: hidden;
  box-shadow: 0px 3px 36px #000;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Form = styled.form`
  width: 50%;
`;
const FieldDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  input {
    width: 100%;
    padding: 2%;
  }
`;
const LabelDiv = styled.div`
  width: 50%;
`;
const Label = styled.label`
  width: 30%;
`;
const CheckBoxInput = styled.input`
  width: 10% !important;
`;
