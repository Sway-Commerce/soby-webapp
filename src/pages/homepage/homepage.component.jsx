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
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';

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
  padding: 16px;
  max-height: 16rem;
  overflow-y: auto;
  border-radius: 3px;

  @media screen and (max-width: 768px) {
    width: calc(100vw - 48px);
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
`;

const Symbol48px = styled.div`
  width: 48px;
  height: 48px;
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
    <div className={''.concat(!isFirst && 'ms-3')} tabIndex={0}>
      <div className='d-flex justify-content-center align-items-center'>
        <CategoryIcon imgSrc={imgSrc} bgColor={bgColor} fill={fill} stroke={stroke} border={border} />
      </div>
      <div
        className='text-center mt-2'
        style={{ width: '72px', height: 'auto', wordWrap: 'break-word', fontSize: '12px', lineHeight: '.8rem' }}
      >
        <span className=''>{value}</span>
      </div>
    </div>
  );
};

const HomePage = () => {
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
    date.setDate(date.getDate() - 7);
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
  return (
    <React.Fragment>
      <Container>
        <Row className='mb-5' headRow>
          <HeadHome>
            <p className='soby-welcome text-center'>
              Lựa chọn &amp; Mua sắm thông minh,
              <br />
              Tiết kiệm thời gian
            </p>
            {/* <h3 className="fw-normal">
              Find your trust Sellers and have safe transactions with Soby
            </h3> */}
            {/* <h3 className="fw-normal mobile-hide">
              Lorem ipsum dolor sit amet
            </h3> */}
            <Search className='mt-4' onSubmit={handleSubmit}>
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
            </Search>
          </HeadHome>
        </Row>
        <div className='row'>
          <div className='d-flex justify-content-center align-items-center mb-4'>
            <span className=''>Xem Duyệt qua các cửa hàng theo nhiều danh mục hơn</span>
          </div>
          <div className='d-flex justify-content-center align-items-start'>
            <Link to='/explore/'>
              <CategoryItem
                value='Nhà hàng &amp; Ăn uống'
                bgColor='#FFA800'
                imgSrc='/assets/categories/food.svg'
                isFirst
                fill='none'
                stroke='white'
              />
            </Link>
            <Link to='/explore/'>
              <CategoryItem value='Điện tử' bgColor='#5BCCFA' imgSrc='/assets/categories/monitor.svg' fill='white' stroke='none' />
            </Link>
            <Link to='/explore/'>
              <CategoryItem
                value='Thời trang &amp; phụ kiện'
                bgColor='#725CFD'
                imgSrc='/assets/categories/t-shirt.svg'
                fill='none'
                stroke='white'
              />
            </Link>
            <Link to='/explore/'>
              <CategoryItem value='Nhà cửa' bgColor='#AFDC10' imgSrc='/assets/categories/furnitures.svg' fill='white' stroke='none' />
            </Link>
            <Link to='/explore/'>
              <CategoryItem
                value='Mỹ phẩm &amp; nước hoa'
                bgColor='#FF70A6'
                imgSrc='/assets/categories/lipstick.svg'
                fill='white'
                stroke='none'
              />
            </Link>
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
      </Container>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? <ErrorPopup content={formError} setOpen={setOpen} /> : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default HomePage;
