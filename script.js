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
                    return curCombo[0].innerText + " has won!!!" ;
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


    let curSymbol = "X";
    const handleMove = ( e ) => {
        if ( e.target.innerText === "" ) { // STILL NEED TO PUT A CHECK IN HERE FOR WHEN THE GAME IS FINISHED, check the h1 element where the game messages are going to be displayed
            e.target.innerText = curSymbol;
            if ( winCheck() ) {
                return console.log( winCheck() )
            } else if ( isTie() ) {
                return console.log( "Game Tied!" )
            }
            curSymbol === "X" ? curSymbol = "O" : curSymbol = "X"; // if move was made alternate between X and O for curSymbol
        }
    };

    let curPlayers = {}; // setPlayers() assigns x and o's keys/values

    const setPlayers = () => {
        curPlayers.x = document.getElementById( "player1" ).value || "Player1";
        curPlayers.o = document.getElementById( "player2" ).value || "Player2";
    };

    const getPlayersName = () => {
        return curPlayers
    };

    return { handleMove, setPlayers, getPlayersName }

})();




const displayController = (() => {

    // when game starts, take away player name input and add a restart button
    // display who's turn it is
    // display when game is won/tied, reset button has to be pressed after? then displays user name inputs and takes away the restart button???


})();




const Player = (name) => {
    // attempt to make player when game starts
    // check if player already exists?
        // if player exists change player's symbol if it is different
    // if player does not exist, create player and store their symbol
    

    return { name }
}




gameBoard.addListenersToGrids()