import type {
  CSSMotionProps,
  MotionEndEventHandler,
  MotionEventHandler
} from 'rc-motion';

const getCollapsedHeight: MotionEventHandler = () => ({
  height: 0,
  opacity: 0
});

const getRealHeight: MotionEventHandler = (node) => ({
  height: node.scrollHeight,
  opacity: 1
});

const getCurrentHeight: MotionEventHandler = (node) => ({
  height: node.offsetHeight
});

const skipOpacityTransition: MotionEndEventHandler = (_, event) =>
  (event as TransitionEvent).propertyName === 'height';

const collapseMotion: CSSMotionProps = {
  leavedClassName: 'rc-collapse-content-hidden',
  motionDeadline: 500,
  motionName: 'rc-collapse-motion',
  onEnterActive: getRealHeight,
  onEnterEnd: skipOpacityTransition,
  onEnterStart: getCollapsedHeight,
  onLeaveActive: getCollapsedHeight,
  onLeaveEnd: skipOpacityTransition,
  onLeaveStart: getCurrentHeight
};

export default collapseMotion;
