import React, { useState } from "react";
import styled from "styled-components";

import ControlPanel from "./ControlPanel";
import StarImage from "./StarImage";

const AppWrapper = styled.div`
  align-items: center;
  border: 0.0625rem solid black;
  display: flex;
  height: 30rem;
  justify-content: center;
  position: relative;
  width: 30rem;
`;

const Root = () => {
  const [velocity, setVelocity] = useState(0);

  return (
    <AppWrapper>
      <StarImage velocity={velocity} />
      <ControlPanel
        max={100}
        min={-100}
        numSteps={200}
        onChange={newVelocity => setVelocity(newVelocity)}
        value={velocity}
      />
    </AppWrapper>
  );
};

export default Root;
