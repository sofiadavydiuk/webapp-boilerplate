import React from "react";

export default function Pagination({activePage = 0, pageCount = 0, onPageChange}) {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        if (i === activePage + 1) {
            pages.push(<span key={i}>{i}</span>);
        } else {
            pages.push(<a key={i} onClick={() => onPageChange(i - 1)}>{i}</a>);
        }
    }

    let left;
    let right;

    if (activePage <= 0) {
        left = <span>«</span>;
    } else {
        left = <a onClick={() => onPageChange(activePage - 1)}>«</a>;
    }


    if (activePage >= pageCount - 1) {
        right = <span>»</span>;
    } else {
        right = <a onClick={() => onPageChange(activePage + 1)}>»</a>
    }


    return (
        <div className="Pagination">
            {left}
            {pages}
            {right}
        </div>
    );
}

