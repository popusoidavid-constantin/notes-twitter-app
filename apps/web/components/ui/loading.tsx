import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen bg-[#15202B] ">
      <div className={`${styles.spinner} border-4 border-t-4 border-blue-500 font-black border-solid rounded-full`}>.</div>
    </div>
  );
};

export default Loading;
