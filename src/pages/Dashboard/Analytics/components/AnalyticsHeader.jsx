
const AnalyticsHeader = ({
  readersData,
  reactionData,
  commentsData,
  timeframe,
}) => {
  const totalComments = commentsData?.reduce(
    (acc, crr) => (acc = acc + crr.totalComments),
    0
  );

  const totalReaders = readersData?.reduce(
    (acc, crr) => (acc = acc + crr.totalReaders),
    0
  );
  const totalReactions = reactionData?.reduce(
    (acc, crr) => (acc = acc + crr.totalReactions),
    0
  );

  return (
    <div className="flex items-center gap-4">
      <div className="w-1/3 py-2 text-center border rounded-md">
        <p className="text-lg font-bold">Readers this {timeframe}</p>
        <div className="mb-2 text-3xl font-bold">{totalReaders || 0}</div>
      </div>
      <div className="w-1/3 py-2 text-center border rounded-md">
        <p className="text-lg font-bold">Reaction this {timeframe}</p>
        <div className="mb-2 text-3xl font-bold">{totalReactions || 0}</div>
      </div>
      <div className="w-1/3 py-2 text-center border rounded-md">
        <p className="text-lg font-bold">Comments this {timeframe}</p>
        <div className="mb-2 text-3xl font-bold">{totalComments || 0}</div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
