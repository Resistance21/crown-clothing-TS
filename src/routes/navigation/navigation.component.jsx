import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../assests/crown.svg";
import { UserContext } from "../../contexts/user.contexts";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon-component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { userSignOut } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinks,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { cartState, setCartState } = useContext(CartContext);
  //console.log("nav", currentUser);

  const logOutHandler = async () => {
    try {
      await userSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={logOutHandler}>
              Sign out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {cartState && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
