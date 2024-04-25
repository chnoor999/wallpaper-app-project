import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    return 250;
  } else if (width < height) {
    // portait
    return 300;
  } else {
    // square
    return 200;
  }
};
