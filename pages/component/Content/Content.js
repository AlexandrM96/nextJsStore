import {useSelector, useDispatch} from 'react-redux'
import {fetchpostsThree} from '../../../store/actions/postActions';
import ContentItem from '../ContentItem/ContentItem';
import Image from "next/image";
import Image1 from '../../../public/img/down.png';
import styles from '../../../styles/Content.module.css';
import Link from "next/link";
import React from "react";

export default function Content() {

    const dispatch = useDispatch();

    const arrayCategoryId = useSelector((state) => state.post.arrayCategoryId[0]);

    const maxPagesPagination = useSelector((state) => state.post.maxPagesPagination);

    const categoryId = useSelector((state) => state.post.categoryId);

    const flagLoad = useSelector((state) => state.post.flagLoad);

    const search = useSelector((state) => state.post.search);

    const minPriсe = useSelector((state) => state.post.minPrice);

    const maxPriсe = useSelector((state) => state.post.maxPrice);

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
                    <Image src={Image1}
                           height="50"
                           width="50"
                           className={styles.load__img}
                           alt="logo"/>
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
                        onClick={(e) => dispatch(fetchpostsThree(+categoryId, 1, search, minPriсe, maxPriсe))}
                    >
                        В начало
                    </button>
                </div>
                {page.map((page, index) =>
                    <div
                        key={index}
                        className={pagNum === page ? styles.content__pagesCount__true : styles.content__pagesCount}
                        onClick={(e) => dispatch(fetchpostsThree(+categoryId, page, search, minPriсe, maxPriсe))}
                    >
                        <Link href={`general/products?page=${page}&category=${categoryId}`} prefetch={false}>
                            <a>
                                {page}
                            </a>
                        </Link>
                    </div>
                )}
                <div>
                    <button
                        className={pagNum <= maxPagesPagination.length - 3 ? styles.content__pagesButton : styles.content__pagesButton__none}
                        onClick={(e) => dispatch(fetchpostsThree(+categoryId, maxPagesPagination[maxPagesPagination.length - 1], search, minPriсe, maxPriсe))}
                    >
                        В конец
                    </button>
                </div>
            </div>
        </div>
    );
}


