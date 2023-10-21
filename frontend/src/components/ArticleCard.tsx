"use client";

// Packages
import style from "../app/styles/ArticleCard.module.css";
import React, { useEffect, useState } from 'react';

type Props = {
    article: {
        id: string;
        title: string;
        source: string;
        publication: number;
        author: string;
        volume: string;
        number: number;
        doi: string;
        comments: string;
        summary?: string;
        seMethod?: string;
        claim?: string;
        evidence?: string;
    };    
    index: number;

    moderation?: boolean;
    mSubmit?: (status: boolean, article: any) => void;

    analysis?: boolean;
    aSubmit?: (article: any) => void;
};

const ArticleCard = ({article, index, moderation, analysis, mSubmit, aSubmit}: Props) => {
    /* MODERATION */

    const critera = [
        "Not a Duplicate",
        "Not Previously Rejected",
        "Relevant to SE",
        "Reputable Source"
    ]

    const [checkedState, setCheckedState] = useState(
        new Array(critera.length).fill(false)        
    );    

    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((value, index) =>
            index === position ? !value : value
        );

        setCheckedState(updatedCheckedState);
    }    

    const resetCheckboxes = () => {
        setCheckedState(new Array(critera.length).fill(false));
    }

    const [approved, setApproved] = useState(false);

    useEffect(() => {
        setApproved(checkedState.every(value => value === true));
    }, [checkedState]);   

    /* ANALYSIS */

    const onChange = (e: React.ChangeEvent<any>) => {

        if (e.target.name === "seMethod" || e.target.name === "claim") {
            article = ({...article, [e.target.name]: e.target.value.toLowerCase()});
        } else {
            article = ({...article, [e.target.name]: e.target.value});
        }
    }

    return (
        <div className={style.container}>
            <div className={style.articleContainer}>
                <div>
                    <h2 className={style.subHeading}>Article ID:</h2>
                    <p className={style.text}>{article?.id}</p>
                    <h2 className={style.subHeading}>Article Title:</h2>
                    <p className={style.text}>{article.title}</p>
                    <h2 className={style.subHeading}>Source:</h2>
                    <p className={style.text}>{article.source}</p>
                    <h2 className={style.subHeading}>publication:</h2>
                    <p className={style.text}>{article.publication}</p>
                    <h2 className={style.subHeading}>Author(s):</h2>
                    <p className={style.text}>{article.author}</p>
                    {article.volume 
                        ?  <><div><h2 className={style.subHeading}>Volume:</h2> <p className={style.text}>{article.volume}</p></div></> 
                        : null}
                    {article.number 
                        ?  <><div><h2 className={style.subHeading}>Number:</h2> <p className={style.text}>{article.number}</p></div></> 
                        : null}
                    {article.doi
                        ?  <><div><h2 className={style.subHeading}>DOI:</h2> <p className={style.text}>{article.doi}</p></div></> 
                        : null}
                    {article.comments
                        ?  <><div><h2 className={style.subHeading}>Comments:</h2> <p className={style.text}>{article.comments}</p></div></> 
                        :    null}
                </div>

            {moderation ? 
                <>
                    <div className={style.checkBoxWrapper}>
                        <form onSubmit={ () => mSubmit?.(approved, article) }>
                            {critera.map((value, index) => {
                                return (
                                    <>
                                        <div style={{display: "flex"}}>
                                            <input 
                                                key={index}
                                                type="checkbox" 
                                                id={`criteria-${index}`} 
                                                name={value} 
                                                value={value}
                                                checked={checkedState[index]}
                                                onChange={() => handleOnChange(index)}
                                                /> 
                                            <label className={style.text}>&nbsp;{value}</label><br/>
                                        </div>
                                    </>
                                );
                            })}
                            <input type="submit" className={approved === true ? `${style.approve}` : `${style.reject}`} value={approved === true ? "Approve" : "Reject"}/>
                        </form>
                    </div>
                </>
                : null}
                </div>
            
            {analysis ? 
                <>
                    <div className={style.textFormWrapper}>
                        <form id={`analysisForm-${index}`} onSubmit={ () => aSubmit?.(article) }>
                            <div>
                                <div className={style.input}>
                                    <label htmlFor={`summary-${index}`}><h2 className={style.subHeading}>Summary:</h2></label>
                                    <input
                                        type="text"
                                        id={`summary-${index}`}
                                        name="summary"
                                        required={true}
                                        value={ article.summary }
                                        onChange={ onChange }
                                        className={style.textInput}
                                    />
                                </div>

                                <div className={style.input}>
                                    <label htmlFor={`method-${index}`}><h2 className={style.subHeading}>SE Method:</h2></label>
                                    <input
                                        type="text"
                                        id={`method-${index}`}
                                        name="seMethod"
                                        required={true}
                                        value={ article.seMethod }
                                        onChange={ onChange }
                                        className={style.textInput}
                                    />
                                </div>

                                <div className={style.input}> 
                                    <label htmlFor={`claim-${index}`}><h2 className={style.subHeading}>Claim:</h2></label>
                                    <input
                                        type="text"
                                        id={`claim-${index}`}
                                        name="claim"
                                        required={true}
                                        value={ article.claim }
                                        onChange={ onChange }
                                        className={style.textInput}
                                    />
                                </div>

                                <div className={style.input}>
                                    <label htmlFor={`claim-${index}`}><h2 className={style.subHeading}>Evidence:</h2></label>
                                    <input
                                        type="text"
                                        id={`evidence-${index}`}
                                        name="evidence"
                                        required={true}
                                        value={ article.evidence }
                                        onChange={ onChange }
                                        className={style.textInput}
                                    />
                                </div>
                            </div>
                            <input className="submit articleSubmitButton" type="submit" value="Submit Article"/>
                        </form>
                    </div>
                </>
                : null}
        </div>
    )
}

export default ArticleCard;