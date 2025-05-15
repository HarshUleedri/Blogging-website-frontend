const Tags = ({ tags }) => {
  return (
    <div className="flex items-center gap-2 py-2 ">
      {tags?.map(({ tag, color }, index) => (
        <>
          <div key={index}>
            <p className="flex items-center p-1 text-sm leading-4 rounded-sm hover:bg-secondary/40">
              <span style={{ color: color }}>#</span>

              {tag}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Tags;
