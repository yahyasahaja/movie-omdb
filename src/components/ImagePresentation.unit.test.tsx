import React from 'react';
import { mount } from 'enzyme';
import ImagePresentation from './ImagePresentation';
import { Provider } from 'react-redux';
import { store } from 'store';
import { showImagePresentation } from 'store/ImagePresentation';

describe('<MovieCard />', () => {
  it('Should be able to hide if intended not to be shown', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ImagePresentation />
      </Provider>
    );
    const imagePresentation = wrapper.find(
      '[data-testid="image-presentation-hidden"]'
    );
    expect(imagePresentation.exists()).toEqual(true);
    wrapper.unmount();
  });

  it('Should be able to show if intended to be shown', () => {
    const imageSrc = 'imagesrcurl';
    store.dispatch(showImagePresentation(imageSrc));
    const wrapper = mount(
      <Provider store={store}>
        <ImagePresentation />
      </Provider>
    );
    const imagePresentationEmpty = wrapper.find(
      '[data-testid="image-presentation-hidden"]'
    );
    expect(imagePresentationEmpty.exists()).toEqual(false);
    const postimagePresentation = wrapper.find(
      '[data-testid="image-presentation"]'
    );
    expect(postimagePresentation.exists()).toEqual(true);
    const image = wrapper.find('img[data-testid="image-presentation-img"]');
    expect(image.prop('src')).toEqual(imageSrc);
    wrapper.unmount();
  });
});
