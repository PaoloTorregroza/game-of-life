
// Return the number of neighbors of x cell
export function countNeighbors(y, x, board){
    let neighbors = 0

    // CORNERS
    // Top left
    if(y == 0 && x == 0){
        board[0][1].state == 1 ? neighbors++ : neighbors += 0
        board[1][0].state == 1 ? neighbors++ : neighbors += 0
        board[1][1].state == 1 ? neighbors++ : neighbors += 0
        return neighbors
    }// Top right 
    else if (y == 0 && x == 59){
        board[0][58].state == 1 ? neighbors++ : neighbors += 0
        board[1][58].state == 1 ? neighbors++ : neighbors += 0
        board[1][59].state == 1 ? neighbors++ : neighbors += 0
        return neighbors
    }//Bottom left
    else if(y == 23 && x == 0){
        board[22][0].state == 1 ? neighbors++ : neighbors += 0
        board[22][1].state == 1 ? neighbors++ : neighbors += 0
        board[23][1].state == 1 ? neighbors++ : neighbors += 0
        return neighbors
    }// Bottom right
    else if(y == 23 && x == 59){
        board[22][58].state == 1 ? neighbors++ : neighbors += 0
        board[22][59].state == 1 ? neighbors++ : neighbors += 0
        board[23][58].state == 1 ? neighbors++ : neighbors += 0
        return neighbors
    }

    // TOP
    if(y == 0){
        board[0][x-1].state == 1 ? neighbors++ : neighbors += 0
        board[0][x+1].state == 1 ? neighbors++ : neighbors += 0
        board[1][x-1].state == 1 ? neighbors++ : neighbors += 0
        board[1][x].state == 1 ? neighbors++ : neighbors += 0
        board[1][x+1].state == 1 ? neighbors++ : neighbors += 0
        return neighbors
    }
    // BOTTOM
    if(y == 23){
        board[23][x-1].state == 1 ? neighbors++ : neighbors += 0
        board[23][x+1].state == 1 ? neighbors++ : neighbors += 0
        board[22][x-1].state == 1 ? neighbors++ : neighbors += 0
        board[22][x].state == 1 ? neighbors++ : neighbors += 0
        board[22][x+1].state == 1 ? neighbors++ : neighbors += 0
        return neighbors
    }
    // LEFT
    if(x == 0){
        board[y-1][0].state == 1 ? neighbors++ : neighbors += 0
        board[y+1][0].state == 1 ? neighbors++ : neighbors += 0
        board[y-1][x+1].state == 1 ? neighbors++ : neighbors += 0
        board[y][x+1].state == 1 ? neighbors++ : neighbors += 0
        board[y+1][x+1].state == 1 ? neighbors++ : neighbors += 0
        return neighbors
    }
    // RIGHT
    if(x == 59){
        board[y-1][59].state == 1 ? neighbors++ : neighbors += 0
        board[y+1][59].state == 1 ? neighbors++ : neighbors += 0
        board[y-1][x-1].state == 1 ? neighbors++ : neighbors += 0
        board[y][x-1].state == 1 ? neighbors++ : neighbors += 0
        board[y+1][x-1].state == 1 ? neighbors++ : neighbors += 0
        return neighbors
    }

    // NORMAL CHECK

    board[y+1][x-1].state == 1 ? neighbors++ : neighbors += 0
    board[y+1][x].state == 1 ? neighbors++ : neighbors += 0
    board[y+1][x+1].state == 1 ? neighbors++ : neighbors += 0
    board[y][x-1].state == 1 ? neighbors++ : neighbors += 0
    board[y][x+1].state == 1 ? neighbors++ : neighbors += 0
    board[y-1][x-1].state == 1 ? neighbors++ : neighbors += 0
    board[y-1][x].state == 1 ? neighbors++ : neighbors += 0
    board[y-1][x+1].state == 1 ? neighbors++ : neighbors += 0
    return neighbors
}

// Return a state based on neighbors
export function rulesAply(neighbors, state) {
    if(neighbors < 2) {return 0}
    if(neighbors > 3) {return 0}
    if(neighbors == 3){return 1}
    return state
}