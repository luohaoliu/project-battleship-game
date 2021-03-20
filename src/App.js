import './App.css'
import React, {useEffect } from 'react';
import uniqid from "uniqid";
 
const App = () => {

  const Ship = (shipName, shipArray) => {
      
      let shipCoordinates = [];

      let j = 0;

      while (j < shipArray.length) {

        shipCoordinates.push({coordinate: shipArray[j], hit: false, sink: false, name: shipName });

        j++;

      }

      const isSunk = () => {
        let counter = 0;
        for (let i = 0; i < shipCoordinates.length; i++) {
          if (shipCoordinates[i].hit === true) {
            counter++;
          }
        }
        if (counter === shipCoordinates.length) {
          for (let i = 0; i < shipCoordinates.length; i++) {
            shipCoordinates[i].sink = true;
              
          }
        }
      };
      

      const hit = (coordinateChosenByEnemy) => {  
        for (let i = 0; i < shipCoordinates.length; i++) {
          if (shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            shipCoordinates[i].hit = true;
          }
        }
      };
      
      return {shipCoordinates, hit, isSunk}; 
    }


    const playerGameBoard = () => {
      
      let playerCarrierArray = ["A1", "B1", "C1", "D1", "E1"]; 
      const playerCarrier = Ship("carrier", playerCarrierArray);

      let playerBattleshipArray = ["J2", "J3", "J4", "J5", "J6"]; 
      const playerBattleship = Ship("battleship", playerBattleshipArray);

      let playerCruiserArray = ["A6", "B6", "C6"];
      const playerCruiser = Ship("cruiser", playerCruiserArray);
      
      let playerSubmarineArray = ["G8", "G9", "G10"];
      const playerSubmarine = Ship("submarine", playerSubmarineArray);
        
      let playerDestroyerArray = ["A9", "A10"];
      const playerDestroyer = Ship("destroyer", playerDestroyerArray);      
      
      let computerPlayerMissedShots = [];

      let computerPlayerHitShots = [];
      
      const receiveComputerAttack = (coordinateChosenByEnemy) => {

        let targetFound = false;

        for (let i = 0; i < playerCarrier.shipCoordinates.length; i++) {

          if (playerCarrier.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(computerPlayerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              playerCarrier.hit(coordinateChosenByEnemy); 
              targetFound = true;
              computerPlayerHitShots.push(coordinateChosenByEnemy);
            } 
          }
        }
        
        for (let i = 0; i < playerBattleship.shipCoordinates.length; i++) {

          if (playerBattleship.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(computerPlayerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              playerBattleship.hit(coordinateChosenByEnemy); 
              targetFound = true;
              computerPlayerHitShots.push(coordinateChosenByEnemy);
            } 
          }
        }

        for (let i = 0; i < playerCruiser.shipCoordinates.length; i++) {

          if (playerCruiser.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(computerPlayerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              playerCruiser.hit(coordinateChosenByEnemy); 
              targetFound = true;
              computerPlayerHitShots.push(coordinateChosenByEnemy);
            } 
          }
        }

        for (let i = 0; i < playerSubmarine.shipCoordinates.length; i++) {

          if (playerSubmarine.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(computerPlayerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              playerSubmarine.hit(coordinateChosenByEnemy); 
              targetFound = true;
              computerPlayerHitShots.push(coordinateChosenByEnemy);
            } 
          }
        }

        for (let i = 0; i < playerDestroyer.shipCoordinates.length; i++) {

          if (playerDestroyer.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(computerPlayerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              playerDestroyer.hit(coordinateChosenByEnemy); 
              targetFound = true;
              computerPlayerHitShots.push(coordinateChosenByEnemy);
            } 
          }
        } 
        
        if (targetFound === false) {

          if(computerPlayerMissedShots.indexOf(coordinateChosenByEnemy) === -1) {
            computerPlayerMissedShots.push(coordinateChosenByEnemy);
            
          }            
        }
        
        let elements = document.getElementsByClassName('grid');
      
        for (let i = 0; i < elements.length; i++) {
    
          if(computerPlayerMissedShots.some(particularElement=> elements[i].id === (particularElement))) {
            if(elements[i].parentNode.id === "player-game-board") {
              elements[i].style.backgroundColor = "yellow";
            }
          }
          
          if(computerPlayerHitShots.some(particularElement=> elements[i].id === (particularElement))) {
            if(elements[i].parentNode.id === "player-game-board") {
              elements[i].style.backgroundColor = "red";
            }
          }
        }
      
      }


      return { playerBattleship, playerCruiser, playerSubmarine, playerCarrier, playerDestroyer, 
        receiveComputerAttack, computerPlayerMissedShots, computerPlayerHitShots,
        playerCarrierArray, playerBattleshipArray, playerCruiserArray, playerSubmarineArray, playerDestroyerArray};
    }


    const computerGameBoard = () => {

      let computerCarrierArray = ["A1", "A2", "A3", "A4", "A5"];
      const computerCarrier = Ship("carrier", computerCarrierArray);
      
      let computerBattleshipArray = ["A10", "B10", "C10", "D10", "E10"];
      const computerBattleship = Ship("battleship", computerBattleshipArray);
      
      let computerCruiserArray = ["D1", "E1", "F1"];
      const computerCruiser = Ship("cruiser", computerCruiserArray);
      
      let computerSubmarineArray = ["J1", "J2", "J3"];
      const computerSubmarine = Ship("submarine", computerSubmarineArray);
      
      let computerDestroyerArray =["H10", "I10"];
      const computerDestroyer = Ship("destroyer", computerDestroyerArray);
      

      let playerMissedShots = [];
      let playerHitShots = [];

      const receivePlayerAttack = (coordinateChosenByEnemy) => {

        let targetFound = false;

        for (let i = 0; i < computerCarrier.shipCoordinates.length; i++) {
          if (computerCarrier.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(playerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              computerCarrier.hit(coordinateChosenByEnemy); 
              targetFound = true;
              playerHitShots.push(coordinateChosenByEnemy);          
            }
          }
        }

        for (let i = 0; i < computerBattleship.shipCoordinates.length; i++) {
          if (computerBattleship.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(playerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              computerBattleship.hit(coordinateChosenByEnemy); 
              targetFound = true;
              playerHitShots.push(coordinateChosenByEnemy);
            }
          }
        }

        for (let i = 0; i < computerCruiser.shipCoordinates.length; i++) {
          if (computerCruiser.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(playerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              computerCruiser.hit(coordinateChosenByEnemy); 
              targetFound = true;
              playerHitShots.push(coordinateChosenByEnemy);
            } 
          }
        }

        for (let i = 0; i < computerSubmarine.shipCoordinates.length; i++) {
          if (computerSubmarine.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(playerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              computerSubmarine.hit(coordinateChosenByEnemy); 
              targetFound = true;
              playerHitShots.push(coordinateChosenByEnemy);
            }
          }
        }

        for (let i = 0; i < computerDestroyer.shipCoordinates.length; i++) {
          if (computerDestroyer.shipCoordinates[i].coordinate === coordinateChosenByEnemy) {
            if(playerHitShots.indexOf(coordinateChosenByEnemy) === -1) {
              computerDestroyer.hit(coordinateChosenByEnemy); 
              targetFound = true;
              playerHitShots.push(coordinateChosenByEnemy);
            }
          }
        } 
        
        if (targetFound === false) {
          if(playerMissedShots.indexOf(coordinateChosenByEnemy) === -1) {
            playerMissedShots.push(coordinateChosenByEnemy);
          }
        }
      }
      
      return {computerCarrier, computerBattleship, computerCruiser, computerSubmarine, computerDestroyer, 
        receivePlayerAttack, playerMissedShots, playerHitShots,
        computerCarrierArray, computerBattleshipArray, computerCruiserArray, computerSubmarineArray, computerDestroyerArray}
    
    }

    

    const player = () => {
      let playerStep = 0;
      let allPlayerChoices = [];
      const playerTurn = (x) => { 
        if (allPlayerChoices.indexOf(x) === -1) {
          obj.allPlayerChoices.push(x);
          console.log(obj.allPlayerChoices);
          obj.playerStep += 1;
          
        }
      }

      const obj = {allPlayerChoices, playerTurn, playerStep};
      return obj;

    }

    

    const computerPlayer = () => {
      let computerPlayerStep = 0;
      let allComputerPlayerChoices = [];
      const computerPlayerTurn = (x) => { 
        if (allComputerPlayerChoices.indexOf(x) === -1) {
          obj.allComputerPlayerChoices.push(x);
          console.log(obj.allComputerPlayerChoices);
          obj.computerPlayerStep += 1;
        
        }
        
      }

      const obj = {allComputerPlayerChoices, computerPlayerTurn, computerPlayerStep};
      return obj;

    }



  

    useEffect(()=> {

      const playerShips = playerGameBoard();

      const computerShips = computerGameBoard();
  
      const jeff = player();
      
      const watson = computerPlayer();
      
      let elements = document.getElementsByClassName('grid');
      
      for (let i = 0; i < elements.length; i++) {
        if(elements[i].parentNode.id === "computer-game-board") {
          elements[i].addEventListener('click', updateStatus, {once: true}); 
        }


        if(playerShips.playerCarrierArray.some(particularElement=> elements[i].id === (particularElement)) ||
        playerShips.playerBattleshipArray.some(particularElement=> elements[i].id === (particularElement)) ||
        playerShips.playerCruiserArray.some(particularElement=> elements[i].id === (particularElement)) ||
        playerShips.playerSubmarineArray.some(particularElement=> elements[i].id === (particularElement)) ||
        playerShips.playerDestroyerArray.some(particularElement=> elements[i].id === (particularElement))) {

          if(elements[i].parentNode.id === "player-game-board") {
            elements[i].style.backgroundColor = "blue";
          }
        }

      }
  
      function updateStatus() {
        if(playerShips.computerPlayerHitShots.length < 18 && computerShips.playerHitShots.length < 18) {
          console.log(playerShips.computerPlayerHitShots.length);
          console.log(computerShips.playerHitShots.length);  
          let coordinatepickedbyPlayer = this.id;
          computerShips.receivePlayerAttack(coordinatepickedbyPlayer); 
          jeff.playerTurn(coordinatepickedbyPlayer);
          

          do {

            let oneRandomCoordinate = gameBoardCoordinates[Math.floor(Math.random()*gameBoardCoordinates.length)];
            watson.computerPlayerTurn(oneRandomCoordinate);
            playerShips.receiveComputerAttack(oneRandomCoordinate);
                         

          } while (watson.computerPlayerStep < jeff.playerStep);
        

          if(this.parentNode.id === "computer-game-board") {
            if(computerShips.computerCarrierArray.some(particularElement=> this.id === (particularElement)) ||
            computerShips.computerBattleshipArray.some(particularElement=> this.id === (particularElement)) ||
            computerShips.computerCruiserArray.some(particularElement=> this.id === (particularElement)) ||
            computerShips.computerSubmarineArray.some(particularElement=> this.id === (particularElement)) ||
            computerShips.computerDestroyerArray.some(particularElement=> this.id === (particularElement))
            ) {
              this.style.backgroundColor = "red";
              
            } else {
              this.style.backgroundColor = "yellow"; 

            }
        }
      }
      }
    })

    const gameBoardCoordinates = 
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
     "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
     "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
     "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10",
     "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
     "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
     "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10",
     "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10",
     "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10",
     "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10",
    ];


    return(
      <div>
        <h1>Battleship Game</h1>
        <h2>Player ships V.S. Computer ships</h2>
    
        <div className="container" id="player-game-board">
          {gameBoardCoordinates.map((gameBoardCoordinate) => {
 
          return <div className="grid" key={uniqid()} id={gameBoardCoordinate}
          style={{backgroundColor: "white"}}
          ></div>
          })}
        </div>
          

        <div className="container" id="computer-game-board">
          {gameBoardCoordinates.map((gameBoardCoordinate) => {
          return <div className="grid" key={uniqid()} id={gameBoardCoordinate}
          ></div>
          })}
        </div>


      </div>
    )
}


export default App;
  


  



