import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OperationBtns from './OperationBtns/OperationBtns';
import style from './Detail.module.scss';
import OptionList from './OptionList/OptionList';
import AddedOptionBox from './AddedOptionBox/AddedOptionBox';

function Detail() {
  const params = useParams();
  const [product, setProduct] = useState({
    productDetailData: [
      {
        name: '',
        discription: '',
        image_url: '',
        price: 0,
      },
    ],
  });

  let value = product.productDetailData[0].price;
  // const [totalPrice, setTotalPrice] = useState(45000);
  // const [productPrice, setProductPrice] = useState(45000);
  const [totalPrice, setTotalPrice] = useState(value);
  const [productPrice, setProductPrice] = useState(value);
  const [changeText, setChangeText] = useState('함께하면 좋은 추천상품');
  const [showItemBox, setShowItemBox] = useState({ display: 'none' });
  const [optionList, setOptionList] = useState({ display: 'none' });
  const [changeBorder, setChangeBorder] = useState({
    border: '1px solid $gray-color',
  });
  const [count, setCount] = useState(1);
  const optionPrice = 2500;

  useEffect(() => {
    fetch(`http://localhost:8000/products/${params.id}`)
      .then(res => res.json())
      .then(res => {
        setProduct(res);
      });
  }, [params.id]);

  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
    window.scrollTo(0, 0);
  };

  const selectItem = () => {
    onClickOptionItem();
    setOptionList({ display: 'none' });
    setChangeBorder({ border: '1px solid #b1b1b1' });
    if (showItemBox.display === 'block') {
      setChangeText('함께하면 좋은 추천상품');
      setTotalPrice(totalPrice - optionPrice);
    } else {
      setChangeText('롱 모던 베이직 화분');
      setTotalPrice(totalPrice + optionPrice);
    }
  };

  const notSelectItem = () => {
    setChangeText('선택안함');
    setOptionList({ display: 'none' });
    setChangeBorder({ border: '1px solid #b1b1b1' });

    // 추가상품 눌렀다가 선택안함 눌렀을 때 추가상품박스 없애기
    if (showItemBox.display === 'block') {
      onClickOptionItem();
      showItemBox.display === 'block' &&
        setTotalPrice(totalPrice - optionPrice);
    }
  };

  const onClickOptionToggle = () => {
    if (optionList.display === 'none') {
      setOptionList({ display: 'block' });
      setChangeBorder({ border: '1px solid #FFCD32' });
    } else {
      setOptionList({ display: 'none' });
      setChangeBorder({ border: '1px solid #b1b1b1' });
    }
    return optionList;
  };

  const minusPrice = () => {
    if (count - 1 < 1) return;
    setCount(count - 1);
    setProductPrice(productPrice / count);
    setTotalPrice(productPrice / count);

    showItemBox.display === 'block' &&
      setTotalPrice(productPrice / count + optionPrice);
  };

  const plusPrice = () => {
    setCount(count + 1);
    setProductPrice((count + 1) * productPrice);
    setTotalPrice((count + 1) * productPrice);
    showItemBox.display === 'block' &&
      setTotalPrice(productPrice * (count + 1) + optionPrice);
  };

  // 추가상품박스 보이게 하는 함수
  const onClickOptionItem = () => {
    showItemBox.display === 'none'
      ? setShowItemBox({ display: 'block' })
      : setShowItemBox({ display: 'none' });
  };

  const deleteItemBox = () => {
    setShowItemBox({ display: 'none' });
    setTotalPrice(totalPrice - optionPrice);
    setChangeText('함께하면 좋은 추천상품');
  };

  return (
    <div className={style.container}>
      <header>
        <div className={style.category}>
          HOME {`>`} 꽃다발 {`>`}
          {product.productDetailData[0].name}
        </div>
      </header>
      <main className={style.content}>
        <div className={style.imgBox} />
        <article className={style.detailBox}>
          <ul className={style.productInfo}>
            <li> {product.productDetailData[0].description}</li>
            <li> {product.productDetailData[0].name}</li>
            <li>{product.productDetailData[0].price}원</li>
          </ul>
          <div className={style.eventTittle}>
            회원 구매 시,
            <span>적립금 2000원 증정!</span>
          </div>
          <div className={style.inBox}>
            <span className={style.contentTittle}>수량</span>
            <div>
              <OperationBtns
                plusPrice={plusPrice}
                count={count}
                minusPrice={minusPrice}
              />
            </div>
          </div>
          <div className={style.inBox}>
            <div className={style.contentTittle}>추가옵션</div>
            <div className={style.option_btn_box} style={changeBorder}>
              <button className={style.optionBtn} onClick={onClickOptionToggle}>
                <div>{changeText}</div>
                <i className={style.btnDown}>⌵</i>
              </button>
              <OptionList
                optionPrice={optionPrice}
                optionList={optionList}
                selectItem={selectItem}
                notSelectItem={notSelectItem}
              />
            </div>
          </div>
          <div className={style.priceBox}>
            <div>상품가격</div>
            <div>{productPrice}원</div>
          </div>
          <AddedOptionBox
            changeStyle={showItemBox}
            deleteItem={deleteItemBox}
            optionPrice={optionPrice}
          />
          <div className={style.totalPriceBox}>
            <span>총 주문금액</span>
            <span>{totalPrice}원</span>
          </div>
          <div className={style.contentBtnBox}>
            <button>장바구니</button>
            <button>바로 구매</button>
          </div>
        </article>
      </main>
    </div>
  );
}

export default Detail;
