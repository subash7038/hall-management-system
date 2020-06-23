import React from "react";
import Component from "./Component";

export default function Details() {
  return (
    <div>
      <Component
        image="left"
        text="Your Bliss Begins Here"
        para="We provide a complete package for all functions of your Family like birthday, Wedding,Catering."
        url={require("../../../img/details1.jpg")}
        location="/about"
        name="More Details"
      />
      <Component
        image="right"
        text="Experience the Excellent amenities"
        para="We give you productive spaces whenever you need it"
        url={require("../../../img/details2.jpg")}
        location="/contact"
        name="Contact us"
      />
      <Component
        image="left"
        text="Flexible meeting spaces"
        para="Ideal choice for people looking for fully equipped,ecomomical meeting and conference venues.Our convention centre is flexible to suit small gatherings as well as conventions and press releases"
        url={require("../../../img/details3.jpg")}
        location="/gallery"
        name="View Halls"
      />
      <Component
        image="right"
        text="Never miss to experience the exceptional"
        para="Our convention centre is at a prime location in the heart of Coimbatore City"
        url={require("../../../img/details4.jpg")}
        location="/booking"
        name="Book now"
      />
    </div>
  );
}
