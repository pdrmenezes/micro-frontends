import { createSignal } from "solid-js";

export default function () {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <div>Count = {count()}</div>
      <button
        className=" text-sm text-gray-600 font-bold border-2  border-green-400  shadow-md rounded-md p-3 mt-3 hover:bg-green-400 hover:text-white"
        onClick={() => setCount(count() + 1)}
      >
        Increase 1
      </button>
    </div>
  );
}
