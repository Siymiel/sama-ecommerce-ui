import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'
// import Stripe from "stripe";
import { useState, useEffect } from "react";
import { userRequest } from '../requestMethods'
import { useNavigate, Link } from 'react-router-dom'
import { deleteProduct, addProductQty, decProductQty, removeProduct } from "../redux/cartFeature";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const Text = styled.span`
  cursor: pointer;
  color: brown;
`;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const KEY = process.env.REACT_APP_STRIPE
  // const stripe = Stripe(KEY);
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch()
  const [stripeToken, setStripeToken] = useState(null)

  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/payment/checkout', {
          tokenId: stripeToken.id,
          amount: cart.total*100
        });
        navigate("/success", { data: res.data })
      } catch (err) {
        console.log(err)
      }
    }
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, navigate])

  const handleQuantity = (id, type) => {
    if (type === "asc") {
      dispatch(addProductQty(id))
    } else {
      dispatch(decProductQty(id))
    }
  }

  useEffect(() => {  
    handleQuantity()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemove = (id) => {
    dispatch(deleteProduct(id))
  }

  const handleClearCart = () => {
    dispatch(removeProduct())
  }


  //  const makePayment =async () => {
  //     try {
  //       const res = await userRequest.post('/payment/checkout', {
  //         product: cart.products[0]._id,
  //         unit_amount: cart.total*100,
  //         quantity: cart.products[0].productQuantity
  //       })
  //       stripe.redirectToCheckout({
  //         sessionId: res.data.sessionId
  //       })
  //     } catch (err) {

  //     }
  //   }


  // useEffect(() => {
  //   makePayment();
  // }, [])

  return ( 
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/products">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.cartQuantity})</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          <TopButton type="filled" onClick={handleClearCart}>CLEAR CART</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map(product => (
              <>
                <Product key={product.id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product.id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {
                      product.productQuantity > 1 ?
                      <Remove onClick={() => handleQuantity(product._id, "desc")}/>
                      :
                      ""
                      }
                      <ProductAmount>{product.productQuantity}</ProductAmount>
                      <Add onClick={() => handleQuantity(product._id, "asc")}/>
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price * product.productQuantity}</ProductPrice>
                  <Text onClick={() => handleRemove(product._id)}>Remove</Text>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
            name="SAMA shop"
            image="https://images.unsplash.com/photo-1583922606661-0822ed0bd916?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=777&q=80"
            billingAddress
            shippingAddress
            description={`Your total is $${cart.total}`}
            amount={cart.total*100}
            token={onToken}
            stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>

              {/* <Button onClick={makePayment}>CHECKOUT NOW</Button> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
