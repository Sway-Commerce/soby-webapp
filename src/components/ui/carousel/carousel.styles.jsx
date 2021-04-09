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
    width: 360px;
    ul.slider li.slide {
      width: 360px;
      height: 500px;
      img {
        height: 500px;
      }
    }

    div.thumbs-wrapper.axis-vertical {
      ul.thumbs li.thumb {
        height: 110px;
        width: 110px !important;
      }
    }
  }
`;
