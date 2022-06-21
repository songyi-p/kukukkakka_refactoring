import { React, useState, useEffect } from 'react';
import styles from './Nav.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineShopping } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

function Nav() {
  const token = localStorage.getItem('token');
  const { navUpdate, setNavUpdate } = useContext(UserContext);
  const [borderLine, setBorderLine] = useState('');
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState('');
  const [isLogIn, setIsLogIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  const changeNavbarColor = () => {
    window.scrollY > 65
      ? setBorderLine('1px solid #ffcd32')
      : setBorderLine('');
  };

  window.addEventListener('scroll', changeNavbarColor);

  const vaildLogin = () => {
    token
      ? navigate('/cart')
      : alert('장바구니는 로그인한 회원만 이용 가능합니다.');
  };

  const clickMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  useEffect(() => {
    fetch('http://localhost:8000/carts', {
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setCounter(data.userCart.length);
        setNavUpdate(false);
      });
  }, [navUpdate, isLogIn]);

  useEffect(() => {
    fetch('http://localhost:8000/users/name', {
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserName(data.userName[0].username);
        setNavUpdate(false);
      });
  }, [navUpdate, isLogIn]);

  useEffect(() => {
    token ? setIsLogIn(true) : setIsLogIn(false);
  }, []);

  return (
    <>
      <div className={styles.allWrapper}>
        <header className={styles.headerWrapper}>
          <ul className={styles.headerList}>
            {navUpdate || isLogIn ? (
              <li className={styles.headerLine}>
                반갑습니다.
                <span className={styles.headerUserName}>{userName}</span>님!
              </li>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <li className={styles.headerMenu}>로그인</li>
              </Link>
            )}
            {navUpdate || isLogIn ? (
              ''
            ) : (
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <li className={styles.headerMenu}>
                  회원가입
                  <span className={styles.pointColor}>(1000포인트 지급!)</span>
                </li>
              </Link>
            )}
            <li className={styles.headerMenu}>꾸까 고객센터</li>
            <li
              className={styles.headerMenu}
              style={{ fontWeight: 400, border: 0, paddingRight: 0 }}
            >
              기업제휴
            </li>
          </ul>
        </header>
      </div>

      <nav className={styles.navSticky} style={{ borderBottom: borderLine }}>
        <div className={styles.navWrapper}>
          <Link to="/">
            <img
              className={styles.mainLogo}
              alt="main-logo"
              src={`${process.env.PUBLIC_URL}/img/main_logo.png`}
              onClick={goToTop}
            />
          </Link>
          <ul className={styles.navList}>
            <li className={styles.navMenu}>꽃 정기구독</li>
            <Link
              to="/list"
              style={{ textDecoration: 'none' }}
              onClick={goToTop}
            >
              <li className={styles.navMenu}>꽃다발</li>
            </Link>
            <li className={styles.navMenu}>당일배송</li>
            <li className={styles.navMenu}>플라워클래스</li>
            <li className={styles.navMenu}>소품샵</li>
            <li className={styles.navMenu}>이벤트</li>
          </ul>

          <div className={styles.iconWrapper}>
            <Link to="/login">
              <AiOutlineUser
                className={styles.navIcon}
                style={{ margin: 0 }}
                onClick={goToTop}
              />
            </Link>
            <AiOutlineShopping
              className={styles.navIcon}
              onClick={vaildLogin}
            />
            <AiOutlineMenu className={styles.menuIcon} onClick={clickMenu} />
            {navUpdate || isLogIn ? (
              <span
                className={styles.cartCounterCss}
                style={{
                  display: counter > 0 ? 'block' : 'none',
                }}
              >
                {counter}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </nav>

      <div className={styles.hiddenNavContainer}>
        <div className={styles.hiddenNavWrapper}>
          <ul
            className={styles.hiddenNavList}
            style={{
              display: menuOpen ? '' : 'none',
            }}
          >
            <li className={styles.hiddenNavMenu}>꽃 정기구독</li>
            <Link
              to="/list"
              style={{ textDecoration: 'none' }}
              onClick={goToTop}
            >
              <li className={styles.hiddenNavMenu}>꽃다발</li>
            </Link>
            <li className={styles.hiddenNavMenu}>당일배송</li>
            <li className={styles.hiddenNavMenu}>플라워클래스</li>
            <li className={styles.hiddenNavMenu}>소품샵</li>
            <li className={styles.hiddenNavMenu}>이벤트</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
