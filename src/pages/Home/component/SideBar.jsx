import { useSearch } from "../../../context/searchContext/searchHook";

const SideBar = () => {
  //value
  const tags = [
    { name: "webdev", icon: "🖥️" },
    { name: "javascript", icon: "💻" },
    { name: "programming", icon: "👨‍💻" },
    { name: "react", icon: "⚛️" },
    { name: "python", icon: "🐍" },
    { name: "typescript", icon: "🔵" },
    { name: "beginners", icon: "🌱" },
    { name: "devops", icon: "⚙️" },
    { name: "css", icon: "🎨" },
    { name: "node", icon: "🌲" },
    { name: "opensource", icon: "💡" },
    { name: "cloud", icon: "☁️" },
    { name: "ai", icon: "🤖" },
    { name: "machinelearning", icon: "🧠" },
    { name: "database", icon: "💾" },
    { name: "security", icon: "🔒" },
    { name: "mobile", icon: "📱" },
    { name: "android", icon: "🤖" },
    { name: "ios", icon: "🍏" },
    { name: "softwareengineering", icon: "🔧" },
  ];

  //hook

  const { setQuery } = useSearch();

  // helper function

  const search = (value) => {
    setQuery(value);
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <>
          <div
            key={index}
            className="flex items-center gap-2 text-lg btn-accent"
            onClick={() => search(tag.name)}
          >
            <div>{tag.icon}</div>
            <div>{tag.name}</div>
          </div>
        </>
      ))}
    </div>
  );
};

export default SideBar;
