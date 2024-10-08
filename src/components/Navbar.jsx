import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogout } from "../redux/apiCalls";
import { removeProduct } from '../redux/cartFeature'
import { ProductContext } from "../utils/contexts/productProvider";
import { popularProducts } from "../data";

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

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
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

const Navbar = () => {
  const cartQuantity = useSelector(state => state.cart.cartQuantity)
  const user = useSelector(state => state.user.currentUser);
  const username = user?.username
  // const cart = useSelector(state => state.cart);
  const [searchTerm, setSearchTerm] = useState("")
  const { setFilteredProducts } = useContext(ProductContext)

  const dispatch = useDispatch();

  const handleLogout = () => {
    attemptLogout(dispatch, {username})
    dispatch(removeProduct())
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.trim() === "") {
      setFilteredProducts(popularProducts);
    } else {
      const foundProducts = popularProducts.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
  
      if (foundProducts.length > 0) {
        setFilteredProducts(foundProducts);
      } else {
        // Optional: If no products match, you can set filteredProducts to an empty array or handle this differently
        setFilteredProducts([]);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input 
            placeholder="Search" 
            value={searchTerm}
            onChange={handleSearchChange}
            />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
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

export default Navbar;
