export function getLayoutInfoForD3 () {
  let { frameWidth, frameHeight } = getFrameDimensions();
  let xTickFrequency = getXTickFrequency(frameWidth);

  return {
    frameWidth: frameWidth,
    frameHeight: frameHeight,
    xTickFrequency: xTickFrequency
  }
}

function getFrameDimensions() {
  let { innerWidth, innerHeight } = window
  let frameHeight, frameWidth;

  if (innerWidth < 600){
    frameWidth = innerWidth;
  } else {
    frameWidth = 600;
  }

  if (innerHeight < 360) {
    frameHeight = innerHeight * 0.8;
  } else {
    frameHeight = 340;
  }

  return { frameWidth: frameWidth, frameHeight: frameHeight };
}

function getXTickFrequency(frameWidth) {
  if (frameWidth < 400) {
    return 10;
  } else if (frameWidth < 490) {
    return 8;
  } else {
    return 4;
  }
}