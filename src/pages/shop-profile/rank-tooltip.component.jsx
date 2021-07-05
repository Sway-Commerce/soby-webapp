import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const TooltipData = styled.div`
  background-color: white;
`;

const RankTooltip = ({ id }) => (
  <ReactTooltip
    id={id}
    aria-haspopup="true"
    role="example"
    place="left"
    type="light"
    effect="solid"
    globalEventOff="click"
  >
    <TooltipData>
      <h5>Soby Rank – Chỉ số uy tín</h5>
      <p className="mg-b-8">
        Giá trị của Soby Rank đối với một cửa hàng sẽ tương đương với tầm quan
        trọng của điểm IMDB đối với một bộ phim, hay của số sao Michelin đối với
        một nhà hàng.
      </p>
      <h5 className="primary-color clickable">Read more</h5>
    </TooltipData>
  </ReactTooltip>
);
export default RankTooltip;
