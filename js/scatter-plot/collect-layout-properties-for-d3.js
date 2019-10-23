export function collectLayoutPropertiesForD3 () {
  let { innerWidth, innerHeight } = window
  let { frameWidth, frameHeight } = getFrameDimensions(innerWidth, innerHeight);
  
  let xTickFrequency = getXTickFrequency(frameWidth);
  let frameArea      = (frameWidth * frameHeight) / 1000;
  let dotRadius      = getDotRadius(frameArea);

  return {
    frameWidth:     frameWidth,
    frameHeight:    frameHeight,
    xTickFrequency: xTickFrequency,
    dotRadius:      dotRadius
  }
}

function getFrameDimensions(innerWidth, innerHeight) {
  let frameHeight, frameWidth;

  if (innerWidth < 600) {
    frameWidth = innerWidth;
  } else {
    frameWidth = 600;
  }

  if (innerHeight < 420) {
    frameHeight = innerHeight * 0.7;
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
    return 16;
  }
}

function getDotRadius(frameArea) {
  if (frameArea < 160) {
    return 3.2
  } else if (frameArea < 200) {
    return 3.8;
  } else {
    return 4.5;
  }
}