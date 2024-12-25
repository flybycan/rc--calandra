import * as React from "react";
import { GestureEventData, PanGestureEventData, GestureTypes } from "@nativescript/core";
import { StyleSheet } from "react-nativescript";

interface SwipeContainerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

export function SwipeContainer({ onSwipeLeft, onSwipeRight, children }: SwipeContainerProps) {
  const [startX, setStartX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef(null);
  const swipeThreshold = 100; // Minimum distance to trigger swipe

  const onTouch = (args: GestureEventData) => {
    if (args.action === GestureTypes.touch) {
      const touch = args.ios ? args.ios.touches.anyObject() : args.android;
      setStartX(touch.getX());
      setIsDragging(true);
    } else if (args.action === GestureTypes.touchUp) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.animate({
          translate: { x: 0, y: 0 },
          duration: 200
        });
      }
    }
  };

  const onPan = (args: PanGestureEventData) => {
    if (!isDragging) return;

    const deltaX = args.deltaX;
    
    if (containerRef.current) {
      // Update position during drag
      containerRef.current.translateX = deltaX;

      // Check if swipe threshold is met
      if (Math.abs(deltaX) >= swipeThreshold) {
        setIsDragging(false);
        
        // Animate to final position
        containerRef.current.animate({
          translate: { x: deltaX > 0 ? 300 : -300, y: 0 },
          duration: 200,
          opacity: 0
        }).then(() => {
          // Reset position instantly
          containerRef.current.translateX = 0;
          containerRef.current.opacity = 1;
          
          // Trigger appropriate swipe handler
          if (deltaX > 0) {
            onSwipeRight();
          } else {
            onSwipeLeft();
          }
        });
      }
    }
  };

  return (
    <gridLayout
      ref={containerRef}
      onTouch={onTouch}
      onPan={onPan}
      style={styles.container}
    >
      {children}
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});