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

const Text = styled.p`
  padding: 5px;
  font-size: 10px;
`;

const Newsletter = () => {

  const [email, setEmails] = useState('')
  const [loading, setLoading] = useState(false)
 
  const handleMailSend = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error('Please fill email to proceed')
    }

    try {
      setLoading(true)
      const { data } = await axios.post('http://localhost:5000/api/email', { email })
      toast.success(data.message)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.response && err.response.data.message ? err.response.data.message : err.message)
    }
  }

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
        <Text>{loading ? "Processing..." : ''}</Text>
        <form>
        <InputContainer>
            <Input 
            placeholder="Your email" 
            name="email" 
            onChange={(e) => setEmails(e.target.value)}
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
