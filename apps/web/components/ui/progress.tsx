export default function LoadingBarTest() {
  return (
    <div className="w-full px-4 py-10">
      <div className="relative h-4 w-1/2 mx-auto bg-gray-300 rounded-full overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300 ease-in-out w-[70%]" />
      </div>
    </div>
  );
}
