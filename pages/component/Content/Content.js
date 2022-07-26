import {useSelector} from 'react-redux'
import ContentItem from '../ContentItem/ContentItem';
import {apiRequestCategoriesAddItems} from '../../../ApiRequestion/API';
import styles from '../../../styles/Content.module.css';
import Image from 'next/image';
import {useState} from "react";

export default function Content() {

    const arrayCategoryId = useSelector((state) => state.arrayCategoryId[0]);

    const maxPagesPagination = useSelector((state) => state.maxPagesPagination);

    const [state, setState] = useState(() => {
        return {
            pagg: maxPagesPagination
        }
    })

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

        console.log('ssssssssssa',pagNum, maxPagesPagination.length)
        console.log('assdddada',arrayCategoryId)
        return (
            <div>
                <div className={styles.content__container}>
                    <div className={!flagLoad ? styles.content__containerLoading__false : styles.content__containerLoading}>
                        {/*<img src='img/down.png' className="load__img" alt="logo"/>*/}
                        {/*<Image*/}
                        {/*    src='img/down.png'*/}
                        {/*    alt="Landscape picture"*/}
                        {/*    width={500}*/}
                        {/*    height={500}*/}
                        {/*/>*/}
                    </div>
                    {arrayCategoryId && arrayCategoryId.map(item =>
                        <div key={item.id}>
                            <ContentItem item={item}/>
                        </div>
                    )}
                </div>
                <div className={styles.content__pages}>
                    <button
                        className={
                            pagNum >= page.length ?
                                styles.content__pagesButton
                                :
                                styles.content__pagesButton__none
                        }
                    >
                        В начало
                    </button>
                    {page && page.map((page, index) =>
                        <div
                            key={index}
                            className={pagNum === page ? styles.content__pagesCount__true : styles.content__pagesCount}
                            onClick={() => apiRequestCategoriesAddItems(+categoryId, page)}
                        >
                            {page}
                        </div>
                    )}
                    <div className={styles.content__pages}>
                        <button className={
                            pagNum <= maxPagesPagination.length - 3 ?
                                styles.content__pagesButton
                                :
                                styles.content__pagesButton__none
                        }
                        >
                            В конец
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


