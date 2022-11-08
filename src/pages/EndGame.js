import React, { useEffect,useState } from "react";
import { getDatabase, ref,update, get, child } from "firebase/database";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { restartGame } from "../store/slices/gameState.slice";
import Button from "../components/Button";
import "./Styles.css";

const EndGamePage = () => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz.score);
  const tottime = useSelector((state) => state.quiz.tottime);
  const email = auth.currentUser.email;
  const number = useSelector((state) => state.user.phone);
  const username = useSelector((state) => state.user.username);
  const writeScore = async() => {
      const db = getDatabase();
      const dbRef = ref(db);
      let logins = 1;
      let s = 0;
      let t = 0;
      await get(child(dbRef, `users/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          logins = data.logins+1;
          s = data.score;
          t = data.tottime
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      const updatedScore={
        email:email,
        number: number,
        score:score,
        time:tottime,
        username: username,
        logins: logins
      }
        const updates = {};
        updates['/users/' + auth.currentUser.uid] = updatedScore;
        return update(ref(db), updates);
  }

  

  const restartHandler = async() => {
    await writeScore();
    navigate("/home");
    dispatch(restartGame());
  };
  const navigate = useNavigate();
  return (
    <div className="game-over">
      <div className="nav">
         <h2 class="" id="nav_head" data-text="THE TIMELESS SAGA"><span>THE TIMELESS SAGA</span></h2>
    </div>
    <div className="game_score">
      <h1 className="hero glitch layers glow glow2 glow3 glow4 glow5">Game Over</h1>
      <h2 className="">
        Your score is <span className="">{score}</span> and time is <span className="">{tottime}</span>
      </h2>
      <Button onClick={restartHandler}>Exit</Button>
      </div>
       <div className="mt-4 p-4">
        {/* {answers.map((answer) => (
          <div
            key={answer.question}
            className="border-b-2 border-rose-300 flex justify-between bg-rose-100"
          >
             <span
              dangerouslySetInnerHTML={{ __html: answer.question }}
              className="mr-4 p-2"
            ></span>
            <span
              className={`p-2 ${
                answer.correctAnswer === answer.answer
                  ? "text-green-600"
                  : "text-red-700"
              }`}
            >
              {answer.answer}
            </span>
          </div>
        ))} */}
        
      </div> 
    </div>
  );
};

export default EndGamePage;
