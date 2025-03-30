const Tags = ({ tags }) => {
  return (
    <div className="flex items-center gap-2 py-2 ">
      {tags?.map(({ tag, color }) => (
        <>
          <div>
            <p className="flex items-center p-1 rounded-sm hover:bg-secondary/40">
              <p style={{ color: color }}>#</p>

              {tag}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Tags;
