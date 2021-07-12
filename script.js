const gameBoard = (() => {
    const allGrids = [ ... document.getElementsByClassName( "grid-piece" ) ];

    const addListenersToGrids = () => {
        allGrids.forEach(grid => {
            grid.addEventListener( "click", game.handleMove )
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

    

    return { winCombinations, allGrids, addListenersToGrids }

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
        if ( displayController.textDisplay === displayController.displayStrs[ "win" ] || displayController.textDisplay === displayController.displayStrs[ "tie" ] ) {
            return true
        }
        return false
    };

    let curSymbol = "X";
    const handleMove = ( e ) => {
        if ( e.target.innerText === "" && !isGameOver() ) {
            if ( isGridEmpty() ) {
                console.log( "players set" );
                setPlayers()
            }
            
            e.target.innerText = curSymbol;
            if ( winCheck() ) {
                return displayController.setTextDisplay( "win" )
            } else if ( isTie() ) {
                return displayController.setTextDisplay( "tie" )
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

    return { handleMove, getPlayers, getTurnsPlayerName  }

})();




const displayController = (() => {
    const playerX = game.getPlayers().x;
    const curPlayer = game.getTurnsPlayerName();
    const displayStrs = {
        start: `${ playerX }, make the first move!`,
        tie: "Game Tied!",
        win: `${curPlayer} has won!!!`,
        turn: `${curPlayer}'s turn`
    };

    const elDisplay = document.getElementById( "text-display" );
    const textDisplay = elDisplay.innerText;
    const setTextDisplay = ( toDisplay ) => {
        if ( toDisplay === "win" || toDisplay === "tie" ) {
            // UNHIDE THE RESET BUTTON

            const elNameInputs = document.getElementsByClassName( "name-inputs" );
            elNameInputs[0].hidden = false;
            elNameInputs[1].hidden = false;
        } else if ( toDisplay === "start" || textDisplay === "Player1, make the first move!" ) {
            // HIDE THE RESET BUTTON
        } else if ( toDisplay === "turn" ) {
            const elNameInputs = document.getElementsByClassName( "name-inputs" );
            if ( elNameInputs[0].hidden !== true ) {
                elNameInputs[0].hidden = true;
                elNameInputs[1].hidden = true;
            }
        }
        
        if ( displayStrs[ toDisplay ] ) {
            elDisplay.innerText = displayStrs[ toDisplay ]
        } else {
            console.log( "display string not found!" )
        }
    }

    return { textDisplay, displayStrs, setTextDisplay }

})();




const Player = (name) => {
    // attempt to make player when game starts
    // check if player already exists?
        // if player exists change player's symbol if it is different
    // if player does not exist, create player and store their symbol
    

    return { name }
}


// ADD EVENT LISTENER TO THE RESET BUTTON

gameBoard.addListenersToGrids()