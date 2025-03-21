import { useState, useEffect, useRef, useCallback } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const DevelopmentInProgress = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const gameLoop = useRef(null);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      // setGameOver(true);
      return;
    }

    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition());
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }, [direction.x, direction.y, food.x, food.y, snake]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };
      if (keyMap[event.key]) {
        setDirection(keyMap[event.key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    gameLoop.current = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop.current);
  }, [snake, direction, gameOver, moveSnake]);

 

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]
 bg-gray-900 text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-2">🚧 Development in Progress 🚧</h1>
      <p className="text-lg text-gray-300 mb-4">Enjoy this classic Snake game while you wait! 🐍</p>

      <div className="relative bg-gray-800 p-6 rounded-2xl shadow-xl">
        {gameOver ? (
          <div>
            <p className="text-red-400 text-lg font-bold">💀 Game Over!</p>
            <button
              onClick={() => {
                setSnake(INITIAL_SNAKE);
                setDirection(INITIAL_DIRECTION);
                setFood(getRandomPosition());
                setGameOver(false);
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition-all"
            >
              Restart Game
            </button>
          </div>
        ) : (
          <div
            className="grid gap-[2px] bg-black p-2 rounded-lg"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              width: "40vh",
              height: "40vh",
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`w-full h-full ${
                    isSnake ? "bg-green-500" : isFood ? "bg-red-500" : "bg-gray-700"
                  }`}
                ></div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevelopmentInProgress;
