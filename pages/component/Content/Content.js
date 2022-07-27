import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {
    fetchposts,
    fetchpostsTwo,
    fetchpostsThree,
    fetchpostsFour,
    fetchpostsSix,
    fetchpostsSeven
} from '../../../store/actions/postActions';
import ContentItem from '../ContentItem/ContentItem';
import styles from '../../../styles/Content.module.css';

export default function Content() {

    const dispatch = useDispatch();

    const arrayCategoryId = useSelector((state) => state.post.arrayCategoryId[0]);

    const maxPagesPagination = useSelector((state) => state.post.maxPagesPagination);

    const categoryId = useSelector((state) => state.post.categoryId);

    const flagLoad = useSelector((state) => state.post.flagLoad);

    let pagNum = useSelector((state) => state.post.pagNum);

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

    return (
        <div className={styles.content}>
            <div className={styles.content__container}>
                <div className={!flagLoad ? styles.content__containerLoading__false : styles.content__containerLoading}>
                    <img src='img/down.png' className={styles.load__img} alt="logo"/>
                </div>
                {arrayCategoryId && arrayCategoryId.map(item =>
                    <div
                        className={styles.content__containerList}
                        key={item.id}
                    >
                        <ContentItem item={item}/>
                    </div>
                )}
            </div>
            <div className={styles.content__pages}>
                <div>
                    <button
                        className={pagNum >= page.length ? styles.content__pagesButton : styles.content__pagesButton__none}
                        onClick={(e) => dispatch(fetchpostsThree(+categoryId, 1))}
                    >
                        В начало
                    </button>
                </div>
                {page.map((page, index) =>
                    <div
                        key={index}
                        className={pagNum === page ? styles.content__pagesCount__true : styles.content__pagesCount}
                        onClick={(e) => dispatch(fetchpostsThree(+categoryId, page))}
                    >
                        {page}
                    </div>
                )}
                <div>
                    <button
                        className={pagNum <= maxPagesPagination.length - 3 ? styles.content__pagesButton : styles.content__pagesButton__none}
                        onClick={(e) => dispatch(fetchpostsThree(+categoryId, maxPagesPagination[maxPagesPagination.length - 1]))}
                    >
                        В конец
                    </button>
                </div>
            </div>
        </div>
    );
}


