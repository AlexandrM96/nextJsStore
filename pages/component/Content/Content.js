import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'
import ContentItem from '../ContentItem/ContentItem';
import {apiRequestCategoriesAddItems} from '../../ApiRequestion/API';
import {changingFlag, changingPagination} from '../../redux/action';
import styles from '../../../styles/Content.module.css';

export default function Content() {

    const arrayCategoryId = useSelector((state) => state.arrayCategoryId[0]);

    const maxPagesPagination = useSelector((state) => state.maxPagesPagination);

    const categoryId = useSelector((state) => state.categoryId);

    const flagLoad = useSelector((state) => state.flagLoad);

    let pagNum = useSelector((state) => state.pagNum);

    let page = [...maxPagesPagination];

    let newPage = [];

    if (pagNum === (page.length - 1)) {
        for (let i = pagNum; i < (pagNum + 2); i++) {
            newPage.push(i);
        }
    } else if (pagNum === page.length) {
        for (let i = pagNum; i < (pagNum + 1); i++) {
            newPage.push(i);
        }
    } else {
        for (let i = pagNum; i < (pagNum + 3); i++) {
            newPage.push(i);
        }
    }

    pagNum === 1 ? page = [...newPage] : page = [pagNum - 1, ...newPage]

    if (pagNum === undefined) {
        page = [1, 2, 3, 4];
        pagNum = 1;
    }
    console.log(pagNum, maxPagesPagination.length)
    return (
        <div className={styles.content}>
            <div className={styles.content__container}>
                <div className={!flagLoad ? styles.content__containerLoading__false : styles.content__containerLoading}>
                    <img src='img/down.png' className="load__img" alt="logo"/>
                </div>
                {arrayCategoryId && arrayCategoryId.map(item =>
                    <div
                        className={styles.ulList__element}
                        key={item.id}
                    >
                        <ContentItem item={item}/>
                    </div>
                )}
            </div>
            <div className={styles.content__pages}>
                {pagNum >= page.length ?
                    <div>
                        <button className={styles.content__pagesButton}>В начало</button>
                    </div>
                    :
                    ''
                }
                {page.map((page, index) =>
                    <div
                        key={index}
                        className={pagNum === page ? styles.content__pagesCount__true : styles.content__pagesCount}
                        onClick={(e) => apiRequestCategoriesAddItems(+categoryId, page)}
                    >
                        {page}
                    </div>
                )}
                {pagNum <= maxPagesPagination.length - 3 ?
                    <div>
                        <button className={styles.content__pagesButton}>В конец</button>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    );
}


