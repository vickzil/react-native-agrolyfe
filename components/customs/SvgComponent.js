import Svg, { Circle, Path, Rect } from "react-native-svg";
import React from "react";

const SvgComponent = (props) => {
  return (
    <>
      <Svg
        height="50%"
        width={130}
        viewBox="0 0 200 200"
        {...props}
        style={{ position: "absolute", top: -82, left: 180, width: 130, zIndex: 0, opacity: 0.55 }}
      >
        <Path
          fill="#bee5c1"
          d="M49.2,-14.2C58.8,13.6,58.2,46.5,43.2,56.7C28.2,66.9,-1.2,54.6,-18.6,38.8C-35.9,23.1,-41.1,4,-36,-17.5C-30.9,-39.1,-15.4,-63.1,2.2,-63.8C19.8,-64.5,39.6,-41.9,49.2,-14.2Z"
          transform="translate(100 100)"
        ></Path>
      </Svg>
      <Svg
        height="50%"
        width={380}
        viewBox="0 0 200 200"
        {...props}
        style={{ position: "absolute", top: 170, left: -190, width: 380, zIndex: 0, opacity: 0.55 }}
      >
        <Path
          fill="#b6dbb9"
          d="M48,-10.8C56.2,9.7,52.8,38.8,37.8,49C22.8,59.2,-3.8,50.5,-24.2,35.2C-44.7,19.9,-59,-2,-53.9,-18.2C-48.9,-34.4,-24.4,-45,-2.3,-44.2C19.9,-43.5,39.7,-31.4,48,-10.8Z"
          transform="translate(100 100)"
        ></Path>
      </Svg>
      <Svg
        height="50%"
        width={210}
        viewBox="0 0 200 200"
        {...props}
        style={{ position: "absolute", bottom: -50, right: -34, width: 100, zIndex: 0, opacity: 0.55 }}
      >
        <Path
          fill="#b6dbb9"
          d="M54.1,-26.7C58.3,-4.9,41.5,14.6,23.8,25.8C6.1,37,-12.6,40,-27.3,30.9C-42.1,21.8,-52.9,0.5,-47.7,-22.7C-42.5,-46,-21.2,-71.2,1.9,-71.8C25,-72.4,50,-48.4,54.1,-26.7Z"
          transform="translate(100 100)"
        ></Path>
      </Svg>
    </>
  );
};

export default SvgComponent;
