
const Meeting = ({ params }: { params: { id: string } }) => {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center gap-10 p-4">
      <p>Meeting id: {params.id}</p>
    </main>
  );
};

export default Meeting;
