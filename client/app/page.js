import CopyIcon from "./components/icons/CopyIcon";

export default function Home() {
  return (
    <main className="flex flex-col gap-5">
      <h1 className="text-white text-2xl font-bold">Generate SQL</h1>
      <div className="flex flex-col gap-3">
        <label className="text-gray-300 text-sm font-light">Digite aqui sua pergunta:</label>
        <textarea type="text" className="rounded-md p-3 bg-gray-800 border-solid border-2 border-gray-500 text-white" placeholder="Quais são os produtos mais populares entre os clientes corporativos?"/>
      </div>
      <button className="rounded-md bg-blue-500 p-2 text-white font-bold">Gerar SQL</button>
      <textarea type="text" className="rounded-md p-3 min-h-[300px] bg-gray-800 border-solid border-2 border-gray-500 text-white" placeholder="SELECT * FROM users WHERE name = 'John'"/>
      <div className="flex">
        <button className="flex flex-row gap-2 justify-center rounded-md bg-blue-500 text-white font-bold p-2 w-[100px]">
          <CopyIcon />
          Copy
        </button>
      </div>
    </main>
  );
}
