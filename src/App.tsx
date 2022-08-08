
import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import './custom.scss';
import Button from 'react-bootstrap/Button';
import RenderLotteryBalls from './RenderLotteryBalls';
import RenderResults from './RenderResults';
/**
 * Lottery Game
 * Consider a lottery game where there are 59 balls numbered from 1 to 59. Please complete  the challenge using JavaScript or TypeScript.
 * Rules
 * The player selects 6 individual numbers from the range 1-59.  
 * 6 Balls are then drawn randomly from the 59 balls available.  
 * Prizes are awarded for matching 3, 4, 5 and 6 Ball numbers.  
 * 3 = 50  
 * 4 = 100  
 * 5 = 200  
 * 6 = 500
 * Create and provide a playable visual version of the lottery game which highlights wins and  lets the user have the following selection options…  
 * • Manual pick - The user should be able to pick 6 numbers.   
 * • Lucky Dip Button - to select 6 random numbers to match.  
 * • Start Game Button - to instruct 6 random balls to be drawn.  
 * • Reset the game  
 * Once the numbers have been drawn they should be matched to the picked (or lucky dip)  numbers. Prizes should be awarded according to the pay-table above. 
 */


/**
 * constants for prizes and winning cash payouts
 */
const FIRST_PRIZE: number = 3;
const SECOND_PRIZE: number = 4;
const THIRD_PRIZE: number = 5;
const FOURTH_PRIZE: number = 6;
const FIRST_WINNING_NUMBER: number = 50;
const SECOND_WINNING_NUMBER: number = 100;
const THIRD_WINNING_NUMBER: number = 200;
const FOURTH_WINNING_NUMBER: number = 500;
const NUMBER_OF_LOTTERY_BALLS: number = 59;

/**
 * generate the data for the lottery balls
 */
const lotteryData: { id: string, lotteryNumber: number }[] =
  [...Array(NUMBER_OF_LOTTERY_BALLS)].map((item, index) => ({
    id: `lottery-ball-${index + 1}`,
    lotteryNumber: index + 1,
  }),
  );

const App = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [luckyDipNumbers, setLuckyDipNumbers] = useState<number[]>([]);
  const [matchingNumbers, setMatchingNumbers] = useState<number[]>([]);
  const [hasStartedGame, setHasStarted] = useState<boolean>(false);
  const [isWinningNumber, setIsWinningNumber] = useState<boolean>(false);
  const [prizes, setPrizes] = useState<number[]>([]);


  const clearSelectedNumbers = () => {
    setSelectedNumbers([]);
    setLuckyDipNumbers([]);
  };

  /**
   * resets the state variables to default
   */
  const startGame = () => {
    setPrizes([]);
    setHasStarted(true);
    setIsWinningNumber(false);
    if (!hasStartedGame) {
      clearSelectedNumbers();
    }
  };

  /**
   * gets selected numbers up to 6 in an array
   */
  const getSelectedNumbers = (value: number) => {
    if (selectedNumbers.length !== 6) {
      setSelectedNumbers(prevState => [...prevState, value]);
    }
  };

  useEffect(() => {
    if (selectedNumbers.length === 6) {
      selectLuckyDipNumbers();
    }
  }, [selectedNumbers])

  /**
   * selects 6 random numbers for lucky dip 
   */
  const selectLuckyDipNumbers = () => {
    if (luckyDipNumbers.length !== 6) {
      const getMultipleRandom = (array: any, numberOfItems: number) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numberOfItems);
      };

      const result = getMultipleRandom(lotteryData, 6).map(data => data.lotteryNumber);
      setLuckyDipNumbers(result);
    }
  };

  const resetGame = () => {
    setPrizes([]);
    clearSelectedNumbers();
    setIsWinningNumber(false);
  }



  const addNumbers = (array: number[]) => array.reduce((a, b) => a + b, 0);

  useEffect(() => {
    const comparedArrays: number[] = selectedNumbers.filter(element => luckyDipNumbers.includes(element));
    setMatchingNumbers(comparedArrays);

    console.log(comparedArrays.length);
    if (matchingNumbers.length === FIRST_PRIZE) {
      setPrizes(prevPrize => [...prevPrize, FIRST_WINNING_NUMBER]);
      setIsWinningNumber(true);
    } else if (matchingNumbers.length === SECOND_PRIZE) {
      setPrizes(prevPrize => [...prevPrize, SECOND_WINNING_NUMBER]);
      setIsWinningNumber(true);
    } else if (matchingNumbers.length === THIRD_PRIZE) {
      setPrizes(prevPrize => [...prevPrize, THIRD_WINNING_NUMBER]);
      setIsWinningNumber(true);
    } else if (matchingNumbers.length === FOURTH_PRIZE) {
      setPrizes(prevPrize => [...prevPrize, FOURTH_WINNING_NUMBER]);
      setIsWinningNumber(true);
    }
  }, [luckyDipNumbers]);


  let prizeCashPayout = addNumbers(prizes);
  return (
    <React.Fragment>
      <div style={{ textAlign: 'center', padding: '10px' }} className="container">
        <h1>AWESOME LOTTERY GAME</h1>
        {!hasStartedGame ? (
          <>
            <h6>please select a game mode and click start game</h6>
            <Button variant="secondary" size="sm" onClick={startGame}> Start Game </Button>
          </>
        ) : (
          <Button variant="secondary" size="sm" onClick={resetGame}> Reset game </Button>
        )}

      </div>
      {hasStartedGame && (
        <RenderLotteryBalls lotteryData={lotteryData} getSelectedNumbers={getSelectedNumbers} />
      )}

      {!isEmpty(selectedNumbers) && (
        <RenderResults lotteryData={selectedNumbers} title="Selected lottery numbers" />
      )}

      {!isEmpty(luckyDipNumbers) && (
        <RenderResults lotteryData={luckyDipNumbers} title="Lucky dip numbers" />
      )}

      {!isEmpty(matchingNumbers) && (
        <RenderResults lotteryData={matchingNumbers} title="Matching numbers" />
      )}

      {!isEmpty(luckyDipNumbers) && (matchingNumbers.length < 3) && (
        <div className="container-fluid selected-numbers">
          <h4 style={{ color: "#FFFFFF" }}>No Luck this time</h4>
          <Button variant="secondary" size="sm" onClick={resetGame}> Reset game </Button>
        </div>
      )}
      {isWinningNumber && (
        <div className="container-fluid" style={{ textAlign: 'center', padding: '10px' }}>
          <h2 style={{ color: 'green' }}>{`congratulations you have won a total cash prize of £${prizeCashPayout}`}</h2>
        </div>
      )}
    </React.Fragment>
  )
}


export default App;
