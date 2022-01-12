import { useCallback, useEffect, useRef, useState } from "react"
import BLOCKS from './blocks';
import './index.css'
import { useInterval } from "./hooks";

const SIZE = [10, 20];
const BLOCK_TYPES = Object.keys(BLOCKS);
const BLOCK_COUNTS = BLOCK_TYPES.length;
const STATUS = ['move', 'fix'];
const DURATION = 400;
let interval;

const App = () => {

  const gameover = useRef();
  const board = useRef();

  const [duration, setDuration] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [block, setBlock] = useState();
  const [temp, setTemp] = useState();
  const [backup, setBackup] = useState();

  // 방향 변경
  const changeDirection = useCallback(() => {
    setTemp({
      ...temp,
      direction: temp.direction < 3
        ? temp.direction + 1
        : 0,
      log: 'z',
    });
  }, [temp]);

  // 블록 이동
  const moveBlock = useCallback((xOrY, num) => {
    const value = temp[xOrY] + num;
    setBlock({ ...temp, [xOrY]: value, log: xOrY });
  }, [temp]);

  const generateNewLine = useCallback(() => {
    const li = document.createElement('li');
    const ul = document.createElement('ul');

    [...Array(SIZE[0])].forEach(x => {
      const matrix = document.createElement('li');
      ul.prepend(matrix);
    })

    li.prepend(ul);
    board.current.prepend(li);
  }, []);

  // 블록 고정
  const fixBlock = useCallback(() => {
    let weight = 1;
    let newScore = score;
    [...board.current.children].forEach(line => {
      let fixedLine = true;
      [...line.firstChild.children].forEach(matrix => {
        if (matrix.classList.contains(STATUS[0])) {
          matrix.classList.remove(STATUS[0]);
          matrix.classList.add(STATUS[1]);
        }
        if (!matrix.classList.contains(STATUS[1])) {
          fixedLine = false;
          return false;
        }
      })

      if (fixedLine) {
        line.remove();
        generateNewLine();
        newScore += (10 * weight);
        weight += 1;
      }
    });

    if (score !== newScore) {
      setScore(newScore);
    }
  }, [score, generateNewLine]);

  // 블록 렌더링
  const renderTempBlock = useCallback((target, setState) => {
    const { type, direction, x, y, log } = target;

    [...board.current.children].forEach(line => {
      [...line.firstChild.children].forEach(matrix => {
        if ([...matrix.classList].includes(STATUS[0])) {
          matrix.classList = [];
        }
      })
    });

    const next = {
      complete: true,
      reason: ''
    };

    BLOCKS[type][direction].forEach(coordinates => {
      const boardX = coordinates[0] + x;
      const boardY = coordinates[1] + y;
      const matrix = board.current.children[boardY]
        ? board.current.children[boardY].firstChild.children[boardX]
        : null
      if (matrix && ![...matrix.classList].includes(STATUS[1])) {
        matrix.classList.add(type, STATUS[0]);
      } else {
        next.complete = false;
        next.reason = log === '' ? 'gameover' : log;
        return false;
      }
    });

    if (next.complete) {
      setState({ ...target });
    }

    return next;
  }, []);

  // 새 블록 생성
  const generateNewBlock = useCallback(() => {
    setDuration(DURATION)
    const index = Math.floor(Math.random() * BLOCK_COUNTS);
    const direction = Math.floor(Math.random() * 4);
    setBlock({
      type: BLOCK_TYPES[index],
      direction,
      x: 3, y: 0, log: ''
    });
  }, []);

  // 새 블록 생성 훅
  useEffect(() => {
    generateNewBlock();
  }, [generateNewBlock]);

  // 블록 정보 복사
  const generateCopyTemp = useCallback(() => {
    if (block) {
      setTemp({ ...block });
    }
  }, [block]);

  // 블록 정보 복사 훅
  useEffect(() => {
    generateCopyTemp();
  }, [generateCopyTemp]);

  // 블록 하강 훅
  useInterval(() => {
    if (temp && gameover.current.style.display !== 'flex') {
      moveBlock('y', 1);
    }
  }, duration);

  const renderGameover = useCallback((display) => {
    gameover.current.style.display = display;
  }, [gameover]);

  // 블록 렌더링 훅
  useEffect(() => {
    if (temp) {
      const next = renderTempBlock(temp, setBackup);
      if (!next.complete) {
        if (next.reason === 'gameover') {
          renderGameover('flex');
          clearInterval(interval);
        } else {
          renderTempBlock(backup, setTemp);
          if (next.reason === 'y') {
            fixBlock();
            generateNewBlock();
          }
        }
      }
    }
  }, [temp, renderTempBlock, generateNewBlock, renderGameover]);

  // 키 입력 이벤트
  useEffect(() => {
    if (gameover.current.style.display !== "flex") {
      const keyDownEvent = (event) => {
        const { keyCode } = event;
        switch (keyCode) {
          case 37:
            moveBlock('x', -1);
            break;
          case 39:
            moveBlock('x', 1);
            break;
          case 40:
            moveBlock('y', 1);
            break;
          case 38:
            changeDirection();
            break;
          case 32:
            setDuration(10);
            break;
          default:
            break;
        };
      };

      document.addEventListener(
        'keydown', keyDownEvent
      );

      return () => {
        document.removeEventListener(
          'keydown', keyDownEvent
        );
      };
    }
  }, [gameover, moveBlock, changeDirection]);

  const restartClick = useCallback(() => {
    [...board.current.children].forEach(line => {
      [...line.firstChild.children].forEach(matrix => {
        matrix.classList = [];
      })
    });
    setScore(0);
    renderGameover('none');
    generateNewBlock();
  }, []);

  return (
    <div className="wrapper">
      <div className="gameOverModal" ref={gameover}>
        <h1>Game Over</h1>
        <button onClick={restartClick}>재도전</button>
      </div>
      <div className="score">{score}</div>
      <div className="gameBoard">
        <ul ref={board}>
          {[...Array(SIZE[1])].map((y, i) => (
            <li key={i}>
              <ul>
                {[...Array(SIZE[0])].map((x, j) =>
                  <li key={`${i}___${j}`} />
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;