export const TextCard = (props) => {
  const { name, data } = props;
  return (
    <>
      <div
        className="flex flex-col items-center select-none max-w-sm px-8 py-6 
        bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-black dark:border-gray-700 dark:hover:bg-white/20 "
      >
        <h1 className="text-3xl">{name}</h1>
        <h1 className="text-3xl">{data}</h1>
      </div>
    </>
  );
};
