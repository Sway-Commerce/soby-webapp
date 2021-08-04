import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backgroundImg from 'shared/assets/home-background.svg';
import { CustomButton } from '../../components/ui/custom-button/custom-button.component';
import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from 'shared/utils/assetsHelper';
import { categoryIconMapper } from '../explore/icon.mapper';

const Container = styled.div`
  margin: auto;

  .container {
    display: flex;
    height: 540px;
    background: #ffffff;
    margin-bottom: 24px;
    padding: 32px 24px 24px;
  }
`;

const Row = styled.div`
  width: 100vw;
  background-color: white;
  margin-bottom: 1.2rem;
  margin-left: ${(props) => (props.headRow ? 'calc(((100vw - 1200px) / 2) * -1)' : 0)};

  .mb-0 {
    margin-bottom: 0rem;
  }

  @media screen and (max-width: 1200px) {
    margin-left: 0;
  }
`;
const HeadHome = styled.div`
  padding: 40px 24px 24px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0d1b1e;
  text-align: center;
  .soby-welcome {
    font-size: 2.6rem;
    font-weight: bold;
    line-height: 73px;
  }
`;

const Search = styled.form`
  display: flex;
  justify-content: center;
  align-items: top;
  position: relative;

  .main-btn {
    width: 120px;
    margin: 0 0 0 14px;
  }
  input#home-input {
    height: 2.4rem;
    width: 600px;
    border-radius: 3px;
    padding: 0 24px;
    margin-top: 1px;
    & ~ label {
      left: 24px;
      top: 12px;
    }
  }
  svg.mobile-btn {
    display: none;
  }

  @media screen and (max-width: 768px) {
    input#home-input {
      width: calc(100vw - 48px);
      padding: 0 16px;
      & ~ label {
        left: 16px;
      }
    }
    .main-btn {
      display: none;
    }
    svg.mobile-btn {
      display: block;
      position: absolute;
      right: 0.8rem;
      top: 10px;
    }
  }
`;

const Latest = styled.div`
  background-color: white;
  padding: 24px;
  h3 {
    margin-bottom: 1.2rem;
  }
`;

const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;

  @media only screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
  }

  padding-bottom: 24px;
  border-bottom: 1px solid #e4e4e4;

  @media only screen and (max-width: 600px) {
    padding-bottom: 24px;
    border-bottom: none;
  }
`;

const ResultSearchBox = styled.div`
  margin-top: 8px;
  width: 600px;
  background-color: white;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.16);
  padding: 10px;
  max-height: 16rem;
  overflow-y: auto;
  border-radius: 5px;
  ::-webkit-scrollbar {
    width: 0.3rem;
    height: 0.3rem;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 30px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-track {
    border-radius: 0px;
  }

  @media screen and (max-width: 768px) {
    width: calc(100vw - 48px);
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
`;

const CategoryIcon = function ({ ...props }) {
  const { imgSrc, fill, stroke, bgColor, border } = props;

  return (
    <div
      className={`rounded-circle d-flex justify-content-center align-items-center ${border && 'border'}`}
      style={{ width: '48px', height: '48px', backgroundColor: bgColor }}
    >
      <div className='d-block'>
        <SVG
          src={toAbsoluteUrl(imgSrc)}
          style={{ width: '24px', height: '24px', marginTop: '-2px', fill: `${fill}`, stroke: `${stroke}` }}
        ></SVG>
      </div>
    </div>
  );
};

const CategoryItem = function ({ ...props }) {
  const { imgSrc, value, isFirst, bgColor, fill, stroke, border } = props;
  return (
    <div className={''.concat(!isFirst && 'ms-4')} tabIndex={0}>
      <div className='d-flex justify-content-center align-items-center'>
        <CategoryIcon imgSrc={imgSrc} bgColor={bgColor} fill={fill} stroke={stroke} border={border} />
      </div>
      <div
        className='text-center mt-2'
        style={{ width: '72px', height: 'auto', wordWrap: 'break-word', fontSize: '12px', lineHeight: '1rem' }}
      >
        <span className='' style={{ color: '#3D494B' }}>
          {value}
        </span>
      </div>
    </div>
  );
};

const DefaultCategoryList = [
  { id: '203', bgColor: '#FFA800', fill: 'none', stroke: 'white'},
  { id: '206', bgColor: '#5BCCFA', fill: 'white', stroke: 'none'},
  { id: '208', bgColor: '#725CFD', fill: 'none', stroke: 'white'},
  { id: '210', bgColor: '#AFDC10', fill: 'white', stroke: 'none'},
  { id: '209', bgColor: '#FF70A6', fill: 'white', stroke: 'none'},
];

const HomeV2Page = () => {
  /* display: ${(props) =>
    !!props.searchResults.length ? 'flex' : 'none'}; ; */
  const [inputSearch, setInputSearch] = useState('');
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [query, setQuery] = useState({
    page: 0,
    pageSize: 6,
    filters: [],
    queries: [],
    sorts: [],
  });
  const debouncedSearchTerm = useDebounce(inputSearch, 500);
  const [recordsSuggest, setRecordsSuggest] = useState([]);

  const [searchAggregatedShop, { data: searchAggregatedShopData, loading: searchAggregatedShopLoading, error: searchAggregatedShopError }] =
    useLazyQuery(SEARCH_AGGREGATED_SHOP, {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    });

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const lastSevenDay = date.getTime();
    const now = Date.now();
    setQuery({ ...query, filters: [`createdAt:${lastSevenDay};${now}`] });
  }, []);

  useEffect(() => {
    if (query.filters.length) {
      if (debouncedSearchTerm || !records.length) {
        searchAggregatedShop({
          variables: {
            query: {
              ...query,
              filters: records.length ? [] : query.filters,
              queries: debouncedSearchTerm ? [`name:${debouncedSearchTerm}`] : [],
            },
          },
        });
      }

      !debouncedSearchTerm && setRecordsSuggest([]);
    }
  }, [debouncedSearchTerm, query.filters]);

  useEffect(() => {
    if (searchAggregatedShopError?.message) {
      setFormError(searchAggregatedShopError?.message);
      setOpen(true);
    }
  }, [searchAggregatedShopError?.message]);

  useEffect(() => {
    if (searchAggregatedShopData?.searchAggregatedShop?.data) {
      !records.length
        ? setRecords(searchAggregatedShopData?.searchAggregatedShop?.data.records)
        : setRecordsSuggest(searchAggregatedShopData?.searchAggregatedShop?.data.records);
    }
  }, [searchAggregatedShopData?.searchAggregatedShop?.data]);

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { value } = event?.target;
    setInputSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery({ ...query, queries: inputSearch ? [`name:${inputSearch}`] : [] });
  };

  console.info('searchRecords', records);
  return (
    <div className='container-fluid mt-2 mb-5'>
      <div className='mb-4'>
        <div className='d-flex justify-content-center align-items-center'>
          <h1 className='fw-bold text-center'>
            Lựa chọn &amp; Mua sắm thông minh,
            <br />
            Tiết kiệm thời gian
          </h1>
        </div>
      </div>
      <div className='mb-4'>
        <div className='d-flex justify-content-center align-items-center'>
          <form onSubmit={handleSubmit}>
            <div
              aria-label='search-wrapper'
              className='d-flex justify-content-center align-items-center p-0 rounded'
              style={{ border: '2px #CFD1D2 solid', boxSizing: 'border-box' }}
            >
              <div>
                <input
                  type='text'
                  name='inputSearch'
                  value={inputSearch}
                  onChange={handleChange}
                  placeholder='Tìm kiếm sản phẩm, cửa hàng, danh mục ...'
                  id='home-input'
                  className='form-control'
                  style={{
                    width: '600px',
                    height: '40px',
                    border: '0px',
                    fontSize: '16px',
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                  }}
                />
              </div>
              <div>
                <button
                  type='submit'
                  className='btn d-flex justify-content-center align-items-center'
                  style={{
                    fontSize: '14px',
                    height: '40px',
                    width: '40px',
                    borderLeft: '2px #CFD1D2 solid',
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
                  }}
                >
                  <div className=''>
                    <SVG
                      className=''
                      src={toAbsoluteUrl('/assets/commons/search.svg')}
                      style={{
                        fill: '#0D1B1E',
                        width: '20px',
                        height: '20px',
                      }}
                    ></SVG>
                  </div>
                </button>
              </div>
            </div>
            {!!recordsSuggest.length && (
              <ResultSearchBox>
                {recordsSuggest.map((shop) => (
                  <ShopItem key={shop.id} shop={shop} className='' />
                ))}
              </ResultSearchBox>
            )}
          </form>
        </div>
      </div>
      {/* <Row className='mb-5' headRow>
          <HeadHome>
            <p className='soby-welcome text-center'>
              Lựa chọn &amp; Mua sắm thông minh,
              <br />
              Tiết kiệm thời gian
            </p>
            <h3 className="fw-normal">
              Find your trust Sellers and have safe transactions with Soby
            </h3>
            <h3 className="fw-normal mobile-hide">
              Lorem ipsum dolor sit amet
            </h3>
            
          </HeadHome>
        </Row> */}
      {/* <Search className='mt-4' onSubmit={handleSubmit}>
        <SearchInputContainer>
          <FormInput
            type='text'
            name='inputSearch'
            value={inputSearch}
            onChange={handleChange}
            placeholder='Tìm kiếm sản phẩm, cửa hàng, danh mục ...'
            withoutTitle
            id='home-input'
          />
          <SearchIcon onClick={handleSubmit} className='mobile-btn clickable' />
          {!!recordsSuggest.length && (
            <ResultSearchBox>
              {recordsSuggest.map((shop) => (
                <ShopItem key={shop.id} shop={shop} className='mg-b-16' />
              ))}
            </ResultSearchBox>
          )}
        </SearchInputContainer>

        <CustomButton type='submit' className='main-btn'>
          Search
        </CustomButton>
      </Search> */}
      <div className=''>
        <div className='d-flex justify-content-center align-items-center mb-3'>
          <span className=''>Xem Duyệt qua các cửa hàng theo nhiều danh mục hơn</span>
        </div>
        <div className='d-flex justify-content-center align-items-start'>
          {DefaultCategoryList.map(function (categoryItem, index) {
            return (
              <Link to={`/explore/${categoryIconMapper[categoryItem.id].name}`}>
                <CategoryItem
                  value={categoryIconMapper[categoryItem.id].name}
                  bgColor={categoryItem.bgColor}
                  imgSrc={categoryIconMapper[categoryItem.id].iconSrc}
                  isFirst={index === 0}
                  fill={categoryItem.fill}
                  stroke={categoryItem.stroke}
                />
              </Link>
            );
          })}
          <Link to='/explore'>
            <CategoryItem
              value='Các mục khác'
              bgColor='#FFFFFF'
              imgSrc='/assets/commons/right-arrow.svg'
              fill='#0D1B1E'
              stroke='none'
              border
            />
          </Link>
        </div>
      </div>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? <ErrorPopup content={formError} setOpen={setOpen} /> : null}
      </SobyModal>
    </div>
  );
};

export default HomeV2Page;
