import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Experience ultimate comfort and style with our latest collection.
          Designed with premium quality materials, this product is durable,
          lightweight, and perfect for everyday use. Upgrade your lifestyle with
          elegance and practicality.
        </p>
        <p>
          Crafted with attention to detail, this item combines modern design
          with lasting performance. Whether for casual wear or special
          occasions, it delivers the perfect balance of fashion and
          functionality. A must-have addition to your collection.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
