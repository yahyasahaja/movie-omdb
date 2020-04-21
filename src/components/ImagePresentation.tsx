import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { hideImagePresentation } from '../store/ImagePresentation';
import { motion, Variants } from 'framer-motion';

const StyledImagePresentation = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: #000000b8;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
    transform: scale(0.7, 0.7);
  }
`;

const variants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 0.7 },
};

const ImagePresentation = () => {
  const [el, setEl] = React.useState<HTMLDivElement | undefined>(undefined);
  const { imageUrl, isShown } = useSelector(
    (store: RootState) => store.imagePresentationStore
  );
  const [isClosed, setIsClosed] = React.useState(true);
  const dispatch = useDispatch();
  const hideModalCallback = React.useCallback(() => {
    dispatch(hideImagePresentation());
  }, [dispatch]);

  React.useEffect(() => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    setEl(element);
    return () => {
      document.body.removeChild(element);
    };
  }, []);

  React.useEffect(() => {
    if (isShown) {
      document.body.classList.add('modal-open');
      setIsClosed(false);
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isShown]);

  if (!el || !isShown) return <div />;
  return ReactDOM.createPortal(
    <StyledImagePresentation onClick={() => setIsClosed(true)}>
      <motion.img
        initial="hidden"
        animate={!isClosed ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationComplete={() => {
          if (isShown && isClosed) {
            hideModalCallback();
          }
          console.log('end?');
        }}
        src={imageUrl}
      />
    </StyledImagePresentation>,
    el
  );
};

export default ImagePresentation;
