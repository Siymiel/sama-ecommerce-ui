import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from "react";
import { publicRequest } from '../requestMethods';
import { addProduct } from "../redux/cartFeature"; 
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { popularProducts } from '../data'

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const BackButton = styled.div`
  padding-left: 28px;
  padding-top: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const Product = () => {

  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  const [productQuantity, setProductQuantity] = useState(1); //product-quantity
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const p = popularProducts.find(item => item.id == slug)
    setProduct(p)
  }, [])

  // console.log("PRO::", product)

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await publicRequest.get(`/products/${slug}`);
  //       setProduct(res?.data?.product)
  //     } catch (err) {
  //       console.log(err)
  //     };
  //   };
  //   getProduct();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [slug]);

  const productsInCart = useSelector(state => state.cart.products)
  const cartProds = Object.values(productsInCart)
  const checkProduct =  () => {
    const boolean = cartProds.map(prod => {
      if(prod.id === slug) {
        return true
      } else {
        return false
      }
    })
    return boolean[0]
}

  const handleQuantity = (type) => {
    if (type === "dec") {
      productQuantity > 1  && setProductQuantity(productQuantity - 1);
    } else {
      setProductQuantity(productQuantity + 1);
    }
  };

  const handleAddToCart = () => {
    if(user) {
      if (product) {
        dispatch(addProduct({ ...product, productQuantity, color, size }));
        toast.success("Product added to cart!")
      } else {
        toast.error("Error selecting product!")
      } 
    } else {
      navigate('/login')
      toast.error('Sign in to continue.');
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      <Wrapper>
        <ImgContainer>
          <Image src={product?.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Desc>
           {product?.desc}
          </Desc>
          <Price>$ {product?.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color?.map((col) => {
                return (
                  <FilterColor color={col} key={col} onClick={() => setColor(col)} />
                )
              })}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product?.size?.map((s) => {
                  return (
                     <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  )
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove style={{"cursor": "pointer"}} onClick={() => handleQuantity("dec")} />
              <Amount>{productQuantity}</Amount>
              <Add style={{"cursor": "pointer"}} onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            {
              checkProduct() === true ? 
              <Button onClick={() => toast.error("Product already added to cart")}>ADD TO CART</Button> :
              <Button  onClick={handleAddToCart}>ADD TO CART</Button>
            }
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
