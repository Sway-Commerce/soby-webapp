import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { stokeColor, gray1Color } from '../../shared/css-variable/variable';

export const Container = styled.div`
  display: flex;
  height: 2em;
  align-items: center;

  .arrow-right {
    margin: 0 .8rem;
  }

  a {
    color: ${stokeColor};
    flex: 1;
    max-width: max-content;
    :last-child {
      cursor: pointer;
      pointer-events: all;
      color: ${gray1Color};
    }
  }
`;

const SharedBreadcrumb = ({ breadcrumbs = [] }) => {
  return (
    <Container>
      {breadcrumbs.map((x, i) => (
        <React.Fragment>
          <Link to={x.src} key={x.name} className="truncate">
            {x.name}
          </Link>
          {i < breadcrumbs.length - 1 ? (
            <p className="arrow-right">&gt;</p>
          ) : null}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default SharedBreadcrumb;
