import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios"
import { useState } from 'react'
import toast from 'react-hot-toast';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Newsletter = () => {

  const [email, setEmails] = useState('')

  const handleChange = (e) => {
    setEmails(e.target.value)
    console.log(e.target.value)
  } 
 
  const handleMailSend = async (e) => {
    e.preventDefault();
    const values = {
      emails: email
    }
    const convertedmails = JSON.stringify(values)
    try {
      await axios.post('http://localhost:5000/api/v1/sendmail', convertedmails)
      toast.success('You have successfully subscribed to Sama Shop newsletter. Talk soon!')
    } catch (err) {
        console.log(err.message)
    }
  }

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
        <form>
        <InputContainer>
            <Input 
            placeholder="Your email" 
            name="emails" 
            onChange={handleChange}
            />
            <Button type="submit" onClick={handleMailSend}>
              <Send/>
            </Button>
        </InputContainer>
        </form>
    </Container>
  );
};

export default Newsletter;
