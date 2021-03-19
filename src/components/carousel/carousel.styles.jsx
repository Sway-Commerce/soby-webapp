import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  width: 250px;

  .carousel .thumb.selected,
  .carousel .thumb:hover {
    border: none;
  }

  div.thumbs-wrapper.axis-vertical {
    margin: 12px 0 0;
    ul.thumbs {
      transform: none !important;
      li.thumb {
        height: 50px;
        width: 50px !important;
        margin-right: 5px !important;
        border: none !important;
      }
    }
  }

  ul.slider li.slide {
    width: 250px;
    height: 250px;
  }
`;
