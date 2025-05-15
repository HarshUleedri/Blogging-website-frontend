
const Hit = ({ hit }) => {
  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold">{hit?.title}</h2>
      <p className="text-gray-500">{hit?.author}</p>
      <p>{hit?.content.slice(0, 100)}...</p>
    </div>
  );
};

export default Hit;
