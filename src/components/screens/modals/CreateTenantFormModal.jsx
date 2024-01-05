import React, { useState } from "react";
import styled from "styled-components";
import { useBearStore } from "../../zustand/Store";
import { apiConfig } from "../../../axiosConfig";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CreateTenantFormModal = ({ addTenantModal, setTenantModal }) => {
  const userData = useBearStore((state) => state.userData);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [panCard, setPanCard] = useState("");
  const [agreementDate, setAgreementdate] = useState("");
  const [monthlyDate, setMonthlyDate] = useState("");

  const formatedendagreementDate = moment(agreementDate).format("YYYY-MM-DD");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("adhar_card", aadhar);
    formData.append("pan_card", panCard);
    agreementDate &&
      formData.append("agreement_end_date", formatedendagreementDate);
    formData.append("monthly_rent_date", monthlyDate);
    apiConfig
      .post("accounts/create-tenant-profile/", formData, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((response) => {
        const { app_data } = response.data;
        if (app_data.StatusCode === 6000) {
          setTenantModal(false);
          navigate("/tenant");
        } else {
          alert(app_data.message);
        }
      });
  };

  return (
    <Cover>
      <Container className={addTenantModal ? "active" : ""}>
        <Overlay onClick={() => setTenantModal(false)}></Overlay>
        <Modal>
          <Form onSubmit={(e) => handleSubmit(e)}>
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
                <Label>phone :</Label>
              </LabelDiv>
              <input
                type="number"
                placeholder="Name"
                onChange={(e) => setPhone(e.target.value)}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>address :</Label>
              </LabelDiv>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setAddress(e.target.value)}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>Aadhar Card :</Label>
              </LabelDiv>
              <input
                type="file"
                onChange={(e) => setAadhar(e.target.files[0])}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>Pan Card :</Label>
              </LabelDiv>
              <input
                type="file"
                onChange={(e) => setPanCard(e.target.files[0])}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>Agreement Date :</Label>
              </LabelDiv>
              <input
                type="date"
                onChange={(e) => setAgreementdate(e.target.value)}
              />
            </FieldDiv>
            <FieldDiv>
              <LabelDiv>
                <Label>Repayment Date :</Label>
              </LabelDiv>
              <input
                type="text"
                onChange={(e) => setMonthlyDate(e.target.value)}
              />
            </FieldDiv>
            <FieldDiv>
              <input type="submit" />
            </FieldDiv>
          </Form>
        </Modal>
      </Container>
    </Cover>
  );
};

export default CreateTenantFormModal;

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
  width: 100%;
  max-width: 736px;
  max-height: 100vh;
  height: 80vh;
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
const Form = styled.form``;
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
