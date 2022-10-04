import React, {useEffect} from 'react';
import s from '../auth/AuthPageContainer.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useParams} from "react-router-dom";
import {changeCurrentCardAC, getAllCards, updateGrade, updateParamsAC} from "../../bll/learnReducer";
import {Grades} from "../../api/cards/cards-api";
import {getCard} from "../../assets/utils/randomGetCard";

export const Learn = () => {
    // const dispatch = useAppDispatch
    // const cards = useAppSelector(state => state.learn.cards)
    // const card = useAppSelector(state => state.learn.currentCard)
    // const isInitializedPage = useAppSelector(state => state.learn.isInitializedPage)
    // const {id} = useParams()
    //
    // useEffect(() => {
    //     dispatch(updateParamsAC({cardsPack_id: id}))
    //     dispatch(getAllCards())
    // }, [])
    return (
        <div className={s.container}>
            <div className={s.block}>
                {/*{isInitializedPage &&*/}
                {/*    <>*/}
                {/*        <div>{`card id: ${card && card._id}`}</div>*/}
                {/*        <div>{`card shots: ${card && card.shots}`}</div>*/}
                {/*        <h1>Learn</h1>*/}
                {/*        <button onClick={() => {*/}
                {/*            card && dispatch(updateGrade({*/}
                {/*                grade: Grades.DidNotKnow,*/}
                {/*                card_id: card._id*/}
                {/*            }))*/}
                {/*        }}>grade1*/}
                {/*        </button>*/}
                {/*        <button onClick={() => {*/}
                {/*            card && dispatch(updateGrade({*/}
                {/*                grade: Grades.Forgot,*/}
                {/*                card_id: card._id*/}
                {/*            }))*/}
                {/*        }}>grade2*/}
                {/*        </button>*/}
                {/*        <button onClick={() => {*/}
                {/*            card && dispatch(updateGrade({*/}
                {/*                grade: Grades.ALotOfThought,*/}
                {/*                card_id: card._id*/}
                {/*            }))*/}
                {/*        }}>grade3*/}
                {/*        </button>*/}
                {/*        <button onClick={() => {*/}
                {/*            card && dispatch(updateGrade({*/}
                {/*                grade: Grades.Confused,*/}
                {/*                card_id: card._id*/}
                {/*            }))*/}
                {/*        }}>grade4*/}
                {/*        </button>*/}
                {/*        <button onClick={() => {*/}
                {/*            card && dispatch(updateGrade({*/}
                {/*                grade: Grades.KnewTheAnswer,*/}
                {/*                card_id: card._id*/}
                {/*            }))*/}
                {/*        }}>grade5*/}
                {/*        </button>*/}
                {/*        <button onClick={() => {*/}
                {/*            dispatch(changeCurrentCardAC(getCard(cards)))*/}
                {/*        }}>next*/}
                {/*        </button>*/}
                {/*    </>*/}
                {/*}*/}
            </div>
        </div>
    );
};