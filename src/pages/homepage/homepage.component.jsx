import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImg from 'shared/assets/home-background.svg';
import avatarImg from 'shared/assets/temp.svg';
import creditImg from 'shared/assets/home-credit.svg';
import heedImg from 'shared/assets/heed.svg';
import { CustomButton } from '../../components/ui/custom-button/custom-button.component';
import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';

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
  width: 100%;
  background-color: white;
  margin-bottom: 1.2rem;
  margin-left: ${(props) =>
    props.headRow ? 'calc(((100vw - 1200px) / 2) * -1)' : 0};

  @media screen and (max-width: 1200px) {
    margin-left: 0;
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    p {
      color: #2b74e4;
    }
  }
`;

const HeadHome = styled.div`
  height: 386.84px;
  background-image: url(${backgroundImg});
  padding: 121.42px 24px 24px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;

  .soby-welcome {
    font-size: 2.6rem;
    font-weight: bold;
    line-height: 73px;
  }

  * + * {
    margin-top: 8px;
  }

  @media screen and (max-width: 600px) {
    height: 320px;
    padding-top: 112px;
    align-items: flex-start;
    .soby-welcome {
      font-size: 32px;
      line-height: 45px;
    }
    h3.mobile-hide {
      display: none;
    }
  }
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
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
      top: 5px;
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
        top: 0;
      }
    }
    .main-btn {
      display: none;
    }
    svg.mobile-btn {
      display: block;
      position: absolute;
      right: 16px;
      bottom: 10px;
    }
  }
`;

const Latest = styled.div`
  background-color: white;
  padding: 24px;
  h3 {
    margin-bottom: 24px;
  }

  @media only screen and (min-width: 600px) {
    h3 {
      margin-bottom: 0;
    }
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

  .item-info {
    display: flex;
  }
  padding-bottom: 24px;
  border-bottom: 1px solid #e4e4e4;

  @media only screen and (max-width: 600px) {
    padding-bottom: 24px;
    border-bottom: none;
  }
`;

const NewItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;

  @media only screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  .item-info {
    display: flex;
  }
  padding-bottom: 24px;
`;

const Item = styled.div`
  display: flex;
  margin-top: 24px;
  img.avt {
    width: 4rem;
    height: 4rem;
    margin-right: 1.15rem;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  .item-info {
    margin-top: 3px;
    display: flex;

    .status {
      color: #4f4f4f;
      font-weight: bold;
      font-size: 14px;
      margin: 0 5.17px 0 8px;
    }

    img.creditImg {
      width: 55px;
      height: 24px;
    }

    img.heed {
      justify-content: flex-start;
      width: 11.67px;
      height: 11.67px;
    }
  }
`;

const HomePage = () => {
  const [inputSearch, setInputSearch] = useState('');
  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { value } = event?.target;
    setInputSearch(value);
  };
  return (
    <Container>
      <Row headRow>
        <HeadHome>
          <p class="soby-welcome">Welcome to Soby</p>
          <h3 className="fw-normal">
            Find your trust Sellers and have safe transactions with Soby
          </h3>
          <h3 className="fw-normal mobile-hide">Lorem ipsum dolor sit amet</h3>
          <Search>
            <FormInput
              type="text"
              name="inputSearch"
              value={inputSearch}
              onChange={handleChange}
              placeholder="Search for Shop, product and invoice"
              required
              withoutTitle
              id="home-input"
            />
            <SearchIcon className="mobile-btn" />
            <CustomButton type="submit" className="main-btn">
              Search
            </CustomButton>
          </Search>
        </HeadHome>
      </Row>
      <Latest>
        <h3>Latest Shops</h3>
        <ItemBox>
          <Item>
            <img src={avatarImg} className="avt" alt="" />
            <ItemInfo>
              <h5 className="body-color">Camera toolkit shop</h5>
              <div class="item-info">
                <img src={creditImg} alt="" />
                <p class="status">Not bad</p>
                <img class="heed" src={heedImg} alt="" />
              </div>
            </ItemInfo>
          </Item>
          <Item>
            <img src={avatarImg} className="avt" alt="" />
            <ItemInfo>
              <h5 className="body-color">Camera toolkit shop</h5>
              <div class="item-info">
                <img src={creditImg} alt="" />
                <p class="status">Not bad</p>
                <img class="heed" src={heedImg} alt="" />
              </div>
            </ItemInfo>
          </Item>
        </ItemBox>
        <ItemBox>
          <Item>
            <img src={avatarImg} className="avt" alt="" />
            <ItemInfo>
              <h5 className="body-color">Camera toolkit shop</h5>
              <div class="item-info">
                <img src={creditImg} alt="" />
                <p class="status">Not bad</p>
                <img class="heed" src={heedImg} alt="" />
              </div>
            </ItemInfo>
          </Item>
          <Item>
            <img src={avatarImg} className="avt" alt="" />
            <ItemInfo>
              <h5 className="body-color">Camera toolkit shop</h5>
              <div class="item-info">
                <img src={creditImg} alt="" />
                <p class="status">Not bad</p>
                <img class="heed" src={heedImg} alt="" />
              </div>
            </ItemInfo>
          </Item>
        </ItemBox>
        <NewItemBox>
          <Item>
            <img src={avatarImg} className="avt" alt="" />
            <ItemInfo>
              <h5 className="body-color">Camera toolkit shop</h5>
              <div class="item-info">
                <img src={creditImg} alt="" />
                <p class="status">Not bad</p>
                <img class="heed" src={heedImg} alt="" />
              </div>
            </ItemInfo>
          </Item>
          <Item>
            <img src={avatarImg} className="avt" alt="" />
            <ItemInfo>
              <h5 className="body-color">Camera toolkit shop</h5>
              <div class="item-info">
                <img src={creditImg} alt="" />
                <p class="status">Not bad</p>
                <img class="heed" src={heedImg} alt="" />
              </div>
            </ItemInfo>
          </Item>
        </NewItemBox>
      </Latest>
    </Container>
  );
};

export default HomePage;
