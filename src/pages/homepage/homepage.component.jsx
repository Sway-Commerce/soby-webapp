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
  margin-left: ${(props) =>
    props.headRow ? 'calc(((100vw - 1200px) / 2) * -1)' : 0};

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
  color: #0D1B1E;
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

const CategoryItem = function ({ itemName, bgColor, iconSrc, url, isFirst }) {
  return (
    <>
      <Link
        to={url}
        className={`d-flex flex-column align-items-center ${!isFirst && 'ms-4'}`}
        style={{ width: '110px', lineHeight: '1rem' }}
      >
        <Symbol48px
          className='d-flex justify-content-center align-items-center rounded-circle mb-2'
          style={{ backgroundColor: `${bgColor}` }}
        >
          <SVG src={toAbsoluteUrl(`${iconSrc}`)}></SVG>
        </Symbol48px>
        <div className='text-center'>
          <span>{itemName}</span>
        </div>
      </Link>
    </>
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

  const [
    searchAggregatedShop,
    {
      data: searchAggregatedShopData,
      loading: searchAggregatedShopLoading,
      error: searchAggregatedShopError,
    },
  ] = useLazyQuery(SEARCH_AGGREGATED_SHOP, {
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
              queries: debouncedSearchTerm
                ? [`name:${debouncedSearchTerm}`]
                : [],
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
        ? setRecords(
          searchAggregatedShopData?.searchAggregatedShop?.data.records
        )
        : setRecordsSuggest(
          searchAggregatedShopData?.searchAggregatedShop?.data.records
        );
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
                <SearchIcon
                  onClick={handleSubmit}
                  className='mobile-btn clickable'
                />
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
            <CategoryItem itemName='Nhà hàng &amp; Ăn uống' bgColor='#FFA800' iconSrc='/assets/food.svg' url='/explore' isFirst ></CategoryItem>
            <CategoryItem itemName='Điện tử' bgColor='#5BCCFA' iconSrc='/assets/digital.svg' url='/explore' ></CategoryItem>
            <CategoryItem itemName='Thời trang &amp; phụ kiện' bgColor='#725CFD' iconSrc='/assets/cloth.svg' url='/explore' ></CategoryItem>
            <CategoryItem itemName='Nhà cửa' bgColor='#AFDC10' iconSrc='/assets/appliance.svg' url='/explore' ></CategoryItem>
            <CategoryItem itemName='Mỹ phẩm &amp; nước hoa' bgColor='#FF70A6' iconSrc='/assets/lip-stick.svg' url='/explore' ></CategoryItem>

            <Link
              to='/explore'
              className='d-flex flex-column align-items-center ms-4'
              style={{ width: '110px', lineHeight: '1rem' }}
            >
              <Symbol48px
                className='d-flex justify-content-center align-items-center rounded-circle mb-2 border'
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <SVG src={toAbsoluteUrl('/assets/right-arrow.svg')}></SVG>
              </Symbol48px>
              <div className='text-center'>
                <span>Các mục khác</span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default HomePage;
