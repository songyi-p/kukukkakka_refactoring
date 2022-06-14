import React, { useEffect, useState, useRef } from 'react';
import styles from './MainListCard.module.scss';
import ListCard from '../List/ListCard';

function MainListCard({
  lists,
  bgColor,
  containerMargin,
  title,
  subTitle,
  text,
  linkTo,
  hide,
}) {
  const [nowCard, setNowCard] = useState(0);
  const cardRef = useRef(null);

  const TOTAL_CARDS = 3;

  const nextListCard = () => {
    nowCard >= TOTAL_CARDS ? setNowCard(0) : setNowCard(nowCard + 1);
  };

  useEffect(() => {
    cardRef.current.style.transition = 'all 0.3s ease-in-out';
    cardRef.current.style.transform = `translateX(-${nowCard * 280}px)`;
  }, [nowCard]);

  return (
    <section
      className={styles.mainContainer}
      style={{
        backgroundColor: bgColor,
        margin: containerMargin,
      }}
    >
      <div
        className={
          hide === 'none' ? styles.flowerTopContainer : styles.mainSubContainer
        }
      >
        <div className={styles.mainSubFlex}>
          <h2 className={styles.mainSubTitle}>
            {title} <strong>{subTitle}</strong>
          </h2>
          <span className={styles.viewMore} onClick={linkTo}>
            {text}
          </span>
        </div>
        <div className={styles.flowerListContainer}>
          <div
            className={
              hide === 'none' ? styles.flowerTopList : styles.flowerList
            }
            ref={cardRef}
          >
            {lists.map(list => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className={styles.turn_list_card_btn}
          onClick={nextListCard}
          style={{ display: hide }}
        >
          〉
        </button>
      </div>
    </section>
  );
}

export default MainListCard;
