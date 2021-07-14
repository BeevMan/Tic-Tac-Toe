// WANT TO MAKE THE GAME GRID THE CENTER OF THE SCREEN???
    // AND EVERYTHING ELSE POSITIONED OFF OF THAT???

const gameBoard = (() => {
    const allGrids = [ ... document.getElementsByClassName( "grid-piece" ) ];

    const addListenersToGame = () => {
        allGrids.forEach(grid => {
            grid.addEventListener( "click", game.handleMove )
        });

        document.getElementById( "reset" ).addEventListener( "click", game.reset );

        document.getElementById( "player1" ).addEventListener( "change", () => {
            const p1Name = document.getElementById( "player1" ).value;
            document.getElementById( "text-display" ).innerText = p1Name + displayController.displayStrs[ "start" ];
        }); 
    };

    const resetGrids = () => {
        allGrids.forEach( grid => {
            grid.innerText = ""
        });
    };

    const winCombinations = {
        topRow : [ allGrids[0], allGrids[1], allGrids[2] ],
        midRow : [ allGrids[3], allGrids[4], allGrids[5] ],
        bottRow : [ allGrids[6], allGrids[7], allGrids[8] ],

        begColumn : [ allGrids[0], allGrids[3], allGrids[6] ],
        midColumn : [ allGrids[1], allGrids[4], allGrids[7] ],
        endColumn : [ allGrids[2], allGrids[5], allGrids[8] ],
        
        diagLine1 : [ allGrids[0], allGrids[4], allGrids[8] ],
        diagLine2 : [ allGrids[2], allGrids[4], allGrids[6] ]
    };

    

    return { winCombinations, allGrids, addListenersToGame, resetGrids }

})();




const game = (() => {
    
    const winCheck = () => {
        const curBoard = gameBoard.winCombinations;
        for ( let combo in curBoard ) {
            const curCombo = curBoard[ combo ];
            if ( curCombo[ 0 ].innerText !== "" ) { // first combo position contains a symbol
                if ( curCombo[ 0 ].innerText === curCombo[ 1 ].innerText && curCombo[ 0 ].innerText === curCombo[ 2 ].innerText ) { // all 3 combo positions contain the same symbol
                    return true ;
                }
            }
        }
    };

    const isTie = () => {
        const gridSpots = gameBoard.allGrids;
        for ( let i = 0; i<gridSpots.length; i++ ) {
            if ( gridSpots[ i ].innerText === "" ) {
                break // there was an empty spot on the gamesGrid 
            } else if ( i === gridSpots.length -1 ) {
                return true // all spots in the gamesGrid are occupied!!!
            }
        }
    };

    const isGridEmpty = () => {
        const gridSpots = gameBoard.allGrids;
        for ( let i = 0; i<gridSpots.length; i++ ) {
            if ( gridSpots[ i ].innerText !== "" ) {
                break
            } else if ( i === gridSpots.length - 1 ) {
                return true
            }
        }
    };

    const isGameOver = () => {
        if ( displayController.textDisplay().endsWith( displayController.displayStrs[ "win" ] ) || displayController.textDisplay().endsWith( displayController.displayStrs[ "tie" ] ) ) {
            return true
        }
        return false
    };

    const reset = () => {
        // set all grid spots to empty strings
        gameBoard.resetGrids();

        // set the display to be the start of the game, hides the reset button as well.
        displayController.setTextDisplay( "start" )
    };

    let curSymbol = "X";
    const handleMove = ( e ) => {

        if ( e.target.innerText === "" && isGameOver() == false ) {
            if ( isGridEmpty() ) {
                setPlayers()
            }
            
            e.target.innerText = curSymbol;
            if ( winCheck() ) {
                displayController.setTextDisplay( "win" );
                return
            } else if ( isTie() ) {
                displayController.setTextDisplay( "tie" );
                return
            }
            curSymbol === "X" ? curSymbol = "O" : curSymbol = "X"; // if move was made alternate between X and O for curSymbol
            displayController.setTextDisplay( "turn" )
        }
    };

    let curPlayers = {}; // setPlayers() assigns x and o's keys/values

    const setPlayers = () => {
        curPlayers.x = document.getElementById( "player1" ).value || "Player1";
        curPlayers.o = document.getElementById( "player2" ).value || "Player2";
    };

    const getPlayers = () => {
        return curPlayers
    };

    const getTurnsPlayerName = () => {
        return curPlayers[ curSymbol.toLowerCase() ]
    };

    return { handleMove, getPlayers, getTurnsPlayerName, reset }

})();




const displayController = (() => {
    const displayStrs = {
        start: ", make the first move!",
        tie: "Game Tied!",
        win: " has won!!!",
        turn: "'s turn"
    };

    const elDisplay = document.getElementById( "text-display" );
    const textDisplay = () => {
       return elDisplay.innerText
    };

    let ogResetDisplay;
    const toggleResetDisplay = () => {
        if ( document.getElementById( "reset" ).style.display !== "none" ) {
            ogResetDisplay = document.getElementById( "reset" ).style.display;
            // Hide the reset button
            document.getElementById( "reset" ).style.display = "none";
        } else {
            // Restore / Unhide reset button
            document.getElementById( "reset" ).style.display = ogResetDisplay;
        }
    };

    let ogDisplayVal;
    const elNameInputs = document.getElementById( "name-inputs" );
    const hideNameInputs = () => {
        if ( elNameInputs.style.display !== "none" ) {
            ogDisplayVal = elNameInputs.style.display;
            elNameInputs.style.display = "none";
        }
    };
    const restoreNameInputsDisplay = () => {
        elNameInputs.style.display = ogDisplayVal
    };

    const setTextDisplay = ( toDisplay ) => {
        if ( toDisplay === "win" || toDisplay === "tie" ) {
            // UNHIDE THE RESET BUTTON
            toggleResetDisplay();

            restoreNameInputsDisplay()
        } else if ( toDisplay === "turn" ) {
            hideNameInputs()
        } else if ( toDisplay === "start" || textDisplay() === "Player1, make the first move!" ) {
            toggleResetDisplay()
        }
        
        if ( displayStrs[ toDisplay ] ) {
            if ( toDisplay === "tie" ) {
                elDisplay.innerText = displayStrs[ toDisplay ]
            } else if ( toDisplay === "start" ) {
                elDisplay.innerText = game.getPlayers().x + displayStrs[ toDisplay ]
            } else {
                elDisplay.innerText = game.getTurnsPlayerName() + displayStrs[ toDisplay ]
            }
        } else {
            console.log( "display string not found!" )
        }
    }

    return { displayStrs, textDisplay, setTextDisplay }

})();



gameBoard.addListenersToGame();

displayController.setTextDisplay(); // to hide the reset button when the game first loads