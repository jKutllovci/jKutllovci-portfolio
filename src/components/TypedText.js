import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['Developer', 'Backend Developer', 'Full Stack Developer', 'Software Developer'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={typedRef} style={{ fontFamily: 'Matrix, monospace' }} />;
};

export default TypedText;
