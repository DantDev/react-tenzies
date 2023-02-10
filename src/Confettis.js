import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from 'usehooks-ts'

function Confettis() {
    const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}

export default Confettis;