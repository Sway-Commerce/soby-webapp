import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  width: 170px;

  .carousel .thumb.selected,
  .carousel .thumb:hover {
    border: none;
  }

  div.thumbs-wrapper.axis-vertical {
    margin: 12px 0 0;
    ul.thumbs {
      transform: none !important;
      li.thumb {
        height: 45px;
        width: 45px !important;
        img {
          height: inherit;
          width: inherit;
          object-fit: scale-down;
        }
        margin-right: 5px !important;
        border: none !important;
      }
    }
  }

  ul.slider li.slide {
    width: 170px;
    height: 170px;
    image {
      width: 170px;
    }
  }

  .large {
    width: 364px;
    ul.slider li.slide {
      width: 364px;
      height: 463px;
      img {
        height: inherit;
      }
    }

    div.thumbs-wrapper.axis-vertical {
      ul.thumbs li.thumb {
        height: 90px;
        width: 90px !important;
      }
    }
  }
`;
