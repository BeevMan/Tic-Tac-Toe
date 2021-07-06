/*

Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, 
    player or gameboard objects.. but take care to put them in “logical” places.
Spending a little time brainstorming here can make your life much easier later!

// game and gameboard will be modules, since they will only have 1 each
// player will be a factory function, since it will have more then 1 
*/
const gameBoard = (() => {
    const allGrids = [ ... document.getElementsByClassName( "grid-piece" ) ];
    const winCombinations = {
        topRow : [ allGrids[0], allGrids[1], allGrids[2] ],
        midRow : [ allGrids[3], allGrids[4], allGrids[5] ],
        bottRow : [ allGrids[6], allGrids[7], allGrids[8] ],

        begColumn : [ allGrids[0], allGrids[3], allGrids[6] ],
        midColumn : [ allGrids[1], allGrids[4], allGrids[7] ],
        endColumn : [ allGrids[2], allGrids[5], allGrids[8] ],
        
        diagLine1 : [ allGrids[0], allGrids[4], allGrids[8] ],
        diagLine2 : [ allGrids[2], allGrids[4], allGrids[6] ]
    }
    return { winCombinations }

})();


const game = (() => {
    const curBoard = gameBoard.winCombinations;
    const winCheck = ( curBoard ) => {
        for ( let combo in curBoard ) {
            console.log( combo );
        }
    };
    return { winCheck }

})();


const Player = (name) => {

    return { name }
}