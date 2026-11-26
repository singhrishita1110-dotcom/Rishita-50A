const BOARD_SIZE = 8;

const PIECES = {
    'r': '\u265C', 'n': '\u265E', 'b': '\u265D', 'q': '\u265B',
    'k': '\u265A', 'p': '\u265F',
    'R': '\u2656', 'N': '\u2658', 'B': '\u2657', 'Q': '\u2655',
    'K': '\u2654', 'P': '\u2659'
};

const STARTING_POSITION = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const BOARD_COLORS = {
    light: '#f0d9b5',
    dark: '#b58863'
};

function applyStyle(el, styles) {
    for (const prop in styles) {
        el.style[prop] = styles[prop];
    }
}

function createBoard() {
    applyStyle(document.body, {
        margin: '0',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1e1e2f'
    });

    const wrapper = document.createElement('div');
    applyStyle(wrapper, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    });

    const title = document.createElement('h1');
    title.textContent = 'Chessboard';
    applyStyle(title, {
        color: '#ffffff',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif'
    });

    const board = document.createElement('div');
    applyStyle(board, {
        display: 'grid',
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 70px)`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, 70px)`,
        border: '6px solid #4a4a6a',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
    });

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const square = document.createElement('div');
            const isLight = (row + col) % 2 === 0;

            applyStyle(square, {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isLight ? BOARD_COLORS.light : BOARD_COLORS.dark,
                width: '70px',
                height: '70px',
                fontSize: '44px',
                lineHeight: '1',
                userSelect: 'none',
                cursor: 'pointer'
            });

            square.addEventListener('mouseenter', () => {
                applyStyle(square, {
                    boxShadow: 'inset 0 0 0 4px rgba(255, 255, 255, 0.35)'
                });
            });
            square.addEventListener('mouseleave', () => {
                square.style.boxShadow = 'none';
            });

            const pieceKey = STARTING_POSITION[row][col];
            if (pieceKey) {
                const piece = document.createElement('span');
                piece.textContent = PIECES[pieceKey];
                applyStyle(piece, {
                    color: pieceKey === pieceKey.toLowerCase() ? '#222222' : '#ffffff',
                    textShadow: pieceKey === pieceKey.toLowerCase()
                        ? '1px 1px 2px rgba(0,0,0,0.4)'
                        : '1px 1px 2px rgba(0,0,0,0.8)'
                });
                square.appendChild(piece);
            }

            if (row === BOARD_SIZE - 1) {
                const fileLabel = document.createElement('span');
                fileLabel.textContent = FILES[col];
                applyStyle(fileLabel, {
                    position: 'absolute',
                    bottom: '2px',
                    right: '5px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: isLight ? BOARD_COLORS.dark : BOARD_COLORS.light,
                    fontFamily: 'Arial, sans-serif'
                });
                applyStyle(square, { position: 'relative' });
                square.appendChild(fileLabel);
            }

            if (col === 0) {
                const rankLabel = document.createElement('span');
                rankLabel.textContent = BOARD_SIZE - row;
                applyStyle(rankLabel, {
                    position: 'absolute',
                    top: '2px',
                    left: '5px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: isLight ? BOARD_COLORS.dark : BOARD_COLORS.light,
                    fontFamily: 'Arial, sans-serif'
                });
                applyStyle(square, { position: 'relative' });
                square.appendChild(rankLabel);
            }

            board.appendChild(square);
        }
    }

    wrapper.append(title, board);
    document.body.appendChild(wrapper);
}

createBoard();
