import React from 'react'
import s from "./Answer.module.css";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import {CardType, Grades} from "../../../api/cards/cards-api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";


type AnswerPropsType = {
    card_id: string | null,
    cards: CardType [],
    card: CardType | null,
    grades: Grades | string
    gradesHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Answer: React.FC<AnswerPropsType> = (props) => {


    return (
        <div className={s.main}>
            <div className={s.block}>
                <div className={s.question}>
                    <span>Answer:</span>
                    <span className={s.questionBody}>{props.card && props.card.answer}</span>
                </div>
                <FormControl>
                    <FormLabel id="radio-buttons-group-label">Rate yourself:</FormLabel>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        defaultValue={Grades.DidNotKnow}
                        name="radio-buttons-group"
                        value={props.grades}
                        onChange={props.gradesHandler}
                    >
                        <FormControlLabel value={Grades.DidNotKnow} control={<Radio size="small"/>}
                                          label="Did not know" labelPlacement="end"/>
                        <FormControlLabel value={Grades.Forgot} control={<Radio size="small"/>}
                                          label="Forgot"/>
                        <FormControlLabel value={Grades.ALotOfThought} control={<Radio size="small"/>}
                                          label="A lot of thought"/>
                        <FormControlLabel value={Grades.Confused} control={<Radio size="small"/>}
                                          label="Confused"/>
                        <FormControlLabel value={Grades.KnewTheAnswer} control={<Radio size="small"/>}
                                          label="Knew the answer"/>
                    </RadioGroup>
                </FormControl>

            </div>
        </div>
    )
}