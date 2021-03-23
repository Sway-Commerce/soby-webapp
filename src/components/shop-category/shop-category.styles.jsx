import styled from 'styled-components';

export const CategoryItem = styled.div`
  .category-item {
    height: 46px;
    padding: 8px 20px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    display: flex;
    margin-right: 16px;
    p {
      font-size: 19px;
      margin: auto 0 auto 8px;
    }

    svg {
      width: -webkit-fill-available;
    }

    &.no-border {
      border: none;
      padding: 0;
    }
  }
`;
