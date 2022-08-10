import React, {useState} from "react";
import Link from "next/link";
import styles from "../../../styles/Content.module.css";
import * as types from "../../../store/reducers/types";


export default function NavigationCategoriesButtons(props) {

    const baseUrl = `https://bion.biz-mark.ru/api/v1/general`;
    const newUrl = props.url.split('/');

    return (
        <Link href={`/categories/[...slug]`} as={`/${newUrl[1]}/${newUrl[2]}/${newUrl[3]}/${props.item.slug}`} prefetch={false}>
            <a>
                {props.item.name}
            </a>
        </Link>
    );
}