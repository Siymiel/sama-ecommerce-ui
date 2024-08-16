import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogout } from "../redux/apiCalls";
import { removeProduct } from '../redux/cartFeature'

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const NavbarHome = () => {
  const cartQuantity = useSelector(state => state.cart.cartQuantity)
  const user = useSelector(state => state.user.currentUser);
  const username = user?.username

  const dispatch = useDispatch();

  const handleLogout = () => {
    attemptLogout(dispatch, {username})
    dispatch(removeProduct())
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo>SAMA SHOP.</Logo>
          </Link>
        </Center>
        <Right>
          {!user && ( 
          <Link to='/register' style={{ textDecoration: 'none' }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          )}
          {!user ? ( 
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>) :
          <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
        }
        <MenuItem>{username && "USERNAME:"} {username && username?.charAt(0).toUpperCase() + username.slice(1)}</MenuItem>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavbarHome;
