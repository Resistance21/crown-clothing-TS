import { SpinnerContainer, SpinnerOverlay } from "./spiner.styles";
import React from "react";

const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default Spinner;
