import {
  Dimensions,
  PixelRatio,
} from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineWidth = 390;
const guidelineHeight = 844;

// Responsive Width
export const wp = (size: number) =>
  (width / guidelineWidth) * size;

// Responsive Height
export const hp = (size: number) =>
  (height / guidelineHeight) * size;

// Responsive Font
export const rf = (size: number) => {

  const scale = width / guidelineWidth;

  const newSize = size * scale;

  return Math.round(
    PixelRatio.roundToNearestPixel(newSize)
  );

};

// Responsive Radius
export const rr = (size: number) =>
  wp(size);

// Tablet Detection
export const isTablet = width >= 768;

// Screen Size
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;