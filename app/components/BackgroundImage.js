
// app/components/BackgroundImage.js
'use client'
import { useState, useEffect } from 'react';

export default function BackgroundImage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Create an image object to preload the background image
    const img = new Image();
    img.src = '/images/background.jpg';
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    // Fallback in case the image takes too long to load
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className={`login-background ${imageLoaded ? 'image-loaded' : ''}`}></div>
  );
}