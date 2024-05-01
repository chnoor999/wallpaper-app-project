import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const getColumnCount = () => {
  if (wp(100) >= 768) {
    // tablet
    return 3;
  } else {
    // phoen
    return 2;
  }
};

export const getImageSize = (height, width) => {
  if (width > height) {
    // landscape
    return wp(100) <= 370 ? 200 : 250;
  } else if (width < height) {
    // portait
    return wp(100) <= 370 ? 250 : 300;
  } else {
    // square
    return wp(100) <= 370 ? 150 : 200;
  }
};
