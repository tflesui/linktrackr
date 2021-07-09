import React, { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavItem from "@material-tailwind/react/NavItem";
import NavLink from "@material-tailwind/react/NavLink";

export default function NavBar(){
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar color="blueGray" navbar>
        <NavbarContainer>
            <NavbarWrapper>
                <NavbarBrand>LinkTrackr</NavbarBrand>
                <NavbarToggler
                    color="white"
                    onClick={() => setOpenNavbar(!openNavbar)}
                    ripple="light"
                />
            </NavbarWrapper>

            <NavbarCollapse open={openNavbar}>
                <Nav>
                    <NavItem active="light" ripple="light">Links</NavItem>
                    <NavLink href="#navbar" ripple="light">Tags</NavLink>
                    <NavItem ripple="light">About</NavItem>
                </Nav>
            </NavbarCollapse>
        </NavbarContainer>
    </Navbar>
  );
}
