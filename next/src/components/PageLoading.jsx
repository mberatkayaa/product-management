"use server";

function PageLoading() {
  return (
    <div className="bg-black bg-opacity-60 h-screen w-screen absolute left-0 top-0">
      <div className="flex flex-col items-center h-full justify-center gap-4 loading-screen-animation">
        <div className="rounded-full bg-teal-600 h-16 w-16" />
        <span className="text-3xl text-teal-600">Loading</span>
      </div>
    </div>
  );
}

export default PageLoading;
