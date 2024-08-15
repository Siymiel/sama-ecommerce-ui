import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const BackButton = styled.div`
  padding-left: 28px;
  padding-top: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({});

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const clearFilter = () => {
    setFilters({})
  }
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      <Title>{cat ? cat : "All Products"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled defaultValue={"black"}>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
            <Option>magenta</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled defaultValue={"Size"}>
              Size
            </Option>
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
          </Select>
          <p style={{"cursor": "pointer"}} onClick={clearFilter}>Clear filter</p>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
