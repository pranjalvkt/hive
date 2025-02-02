import React from "react";
import "../../styles/BeeLoader.css"; // Import the CSS file

const BeeLoader = () => {
  return (
    <div className="bee-loader-container">
      <div className="honey-pot">🍯</div>
      <div className="bee">🐝</div>
      <p>Fetching the sweetest data...</p>
    </div>
  );
};

export default BeeLoader;
