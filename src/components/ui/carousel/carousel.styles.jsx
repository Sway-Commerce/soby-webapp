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
      li.thumb {
        height: 45px;
        width: 45px !important;
        cursor: pointer;
        img {
          height: inherit;
          width: inherit;
          object-fit: cover;
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
    width: 367px;
    ul.slider li.slide {
      width: 367px;
      height: 367px;
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

  @media screen and (max-width: 768px) {
    .large {
      width: 260px;
      ul.slider li.slide {
        width: 260px;
        height: 260px;
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
  }

  @media screen and (max-width: 600px) {
    .large {
      width: 367px;
      ul.slider li.slide {
        width: 367px;
        height: 367px;
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
  }

  @media screen and (max-width: 380px) {
    .large {
      width: calc(100vw - 48px);
      ul.slider li.slide {
        width: calc(100vw - 48px);
        height: calc(100vw - 48px);
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
  }
`;
