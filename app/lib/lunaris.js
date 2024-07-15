// lib/cipher.js
const GRID2 = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y'],
    ['Z', 'a', 'b', 'c', 'd'],
    ['e', 'f', 'g', 'h', 'i'],
    ['j', 'k', 'l', 'm', 'n'],
    ['o', 'p', 'q', 'r', 's'],
    ['t', 'u', 'v', 'w', 'x'],
    ['y', 'z', '0', '1', '2'],
    ['3', '4', '5', '6', '7'],
    ['8', '9', '#', '&', '$']
  ];

const GRID = [
    ['A', 'z', '0', 'B', 'y'],
    ['1', 'C', 'x', '2', 'D'],
    ['w', '3', 'E', 'v', '4'],
    ['F', 'u', '5', 'G', 't'],
    ['6', 'H', 's', '7', 'I'],
    ['r', '8', 'J', 'q', '9'],
    ['K', 'p', '#', 'L', 'o'],
    ['&', 'M', 'n', '$', 'N'],
    ['m', 'O', 'l', 'P', 'k'],
    ['Q', 'j', 'R', 'i', 'S'],
    ['h', 'T', 'g', 'U', 'f'],
    ['V', 'e', 'W', 'd', 'X'],
    ['c', 'Y', 'b', 'Z', 'a']
  ];
  
  const findPosition = (l) => {
    for (let x = 0; x < GRID.length; x++) {
      for (let y = 0; y < GRID[x].length; y++) {
        if (GRID[x][y] === l) {
          return [x, y];
        }
      }
    }
    return null;
  };
  
  const findUp = (l) => {
    const pos = findPosition(l);
    if (pos[0] === 0) pos[0] = GRID.length - 1;
    else pos[0]--;
    return GRID[pos[0]][pos[1]];
  };
  
  const findDown = (l) => {
    const pos = findPosition(l);
    if (pos[0] === GRID.length - 1) pos[0] = 0;
    else pos[0]++;
    return GRID[pos[0]][pos[1]];
  };
  
  const findRight = (l) => {
    const pos = findPosition(l);
    if (pos[1] === 0) pos[1] = GRID[pos[0]].length - 1;
    else pos[1]--;
    return GRID[pos[0]][pos[1]];
  };
  
  const findLeft = (l) => {
    const pos = findPosition(l);
    if (pos[1] === GRID[pos[0]].length - 1) pos[1] = 0;
    else pos[1]++;
    return GRID[pos[0]][pos[1]];
  };
  
  const createLetterMap = () => {
    const letters = {};
    for (let row of GRID) {
      for (let char of row) {
        letters[char] = {
          up: findUp(char),
          left: findLeft(char),
          down: findDown(char),
          right: findRight(char),
        };
      }
    }
    return letters;
  };

  const lunarify = (input, encode = true, key) => {
    let lunar = input;
    for (let i = 0; i < key; i++) lunar = encodeThis(lunar,encode);
    if (!encode) lunar = lunar.replace(/#/g, ' ').replace(/&/g, '.').replace(/\$/g, ',');
    return lunar;
  }
  
  const encodeThis = (input, encode = true) => {
    const letters = createLetterMap();
    if (encode) input = input.replace(/ /g, '#').replace(/\./g, '&').replace(/,/g, '$');
    let output = '';
    let shiftZone = 0;
    for (let char of input) {
      if (letters[char]) {
        output += encodeLetterThenShift(letters[char], encode, shiftZone);
      } else {
        output += char; // If character is not in the GRID, keep it unchanged
      }
      shiftZone = (shiftZone + 1) % 4;
    }
    return output;
  };
  
  const encodeLetterThenShift = (letter, encode, shiftZone) => {
    switch (shiftZone) {
      case 0:
        return encode ? letter.up : letter.down;
      case 1:
        return encode ? letter.left : letter.right;
      case 2:
        return encode ? letter.down : letter.up;
      case 3:
        return encode ? letter.right : letter.left;
      default:
        return letter.up;
    }
  };
  
  export default lunarify;
  