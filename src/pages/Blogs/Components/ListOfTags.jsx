import PropTypes from "prop-types";

const techBlogTags = [
  // General Tech
  {
    tag: "Technology",
    description:
      "Covers general technology trends, advancements, and industry news.",
    color: "#80DEEA", // Darker Cyan
  },
  {
    tag: "Tech News",
    description: "Latest updates and breaking news in the tech world.",
    color: "#64B5F6", // Darker Blue
  },
  {
    tag: "Future Tech",
    description:
      "Explores upcoming and emerging technologies shaping the future.",
    color: "#7986CB", // Darker Indigo
  },
  {
    tag: "Innovation",
    description: "Discussions on cutting-edge innovations in tech.",
    color: "#9CCC65", // Darker Green
  },
  {
    tag: "Gadgets",
    description:
      "Reviews, insights, and comparisons of tech gadgets and devices.",
    color: "#FFB300", // Darker Amber
  },

  // Programming & Development
  {
    tag: "Web Development",
    description:
      "Covers frontend and backend development, including best practices and frameworks.",
    color: "#42A5F5", // Darker Blue
  },
  {
    tag: "Frontend",
    description:
      "Articles related to HTML, CSS, JavaScript, and frontend frameworks.",
    color: "#E57373", // Darker Red
  },
  {
    tag: "Backend",
    description:
      "Covers server-side programming, databases, and backend frameworks.",
    color: "#AB47BC", // Darker Purple
  },
  {
    tag: "Full Stack",
    description:
      "Insights into full-stack development covering both frontend and backend.",
    color: "#26A69A", // Darker Teal
  },
  {
    tag: "JavaScript",
    description:
      "Topics related to JavaScript, including ES6, best practices, and frameworks.",
    color: "#FB8C00", // Darker Orange
  },
  {
    tag: "Python",
    description: "Covers Python programming, frameworks, and use cases.",
    color: "#66BB6A", // Darker Green
  },
  {
    tag: "React",
    description: "Articles focused on React.js, hooks, and React ecosystem.",
    color: "#1E88E5", // Darker Blue
  },
  {
    tag: "Vue.js",
    description: "Guides and tutorials on Vue.js and its ecosystem.",
    color: "#00897B", // Darker Cyan
  },
  {
    tag: "Node.js",
    description: "Covers server-side development using Node.js.",
    color: "#43A047", // Darker Green
  },
  {
    tag: "Django",
    description: "Articles about Django, a Python web framework.",
    color: "#7E57C2", // Darker Purple
  },
  {
    tag: "Tailwind CSS",
    description:
      "Covers Tailwind CSS, utility-first CSS framework for styling.",
    color: "#0288D1", // Darker Cyan
  },
  {
    tag: "GSAP",
    description:
      "Covers GreenSock Animation Platform (GSAP) for web animations.",
    color: "#7CB342", // Darker Green
  },

  // Software Engineering & Best Practices
  {
    tag: "Clean Code",
    description:
      "Covers coding standards, best practices, and writing maintainable code.",
    color: "#FFA000", // Darker Yellow
  },
  {
    tag: "Design Patterns",
    description:
      "Explains common software design patterns and their applications.",
    color: "#00897B", // Darker Teal
  },
  {
    tag: "Coding Best Practices",
    description:
      "General best practices for writing efficient and readable code.",
    color: "#4CAF50", // Darker Green
  },
  {
    tag: "Performance Optimization",
    description:
      "Covers tips and techniques to improve application performance.",
    color: "#EF6C00", // Darker Orange
  },
  {
    tag: "Debugging",
    description: "Techniques and tools for debugging code effectively.",
    color: "#0277BD", // Darker Blue
  },

  // AI & Machine Learning
  {
    tag: "Artificial Intelligence",
    description: "Explores AI concepts, applications, and advancements.",
    color: "#5C6BC0", // Darker Indigo
  },
  {
    tag: "Machine Learning",
    description:
      "Covers ML models, training data, and real-world applications.",
    color: "#1976D2", // Darker Blue
  },
  {
    tag: "Deep Learning",
    description:
      "Articles related to neural networks and deep learning models.",
    color: "#673AB7", // Darker Purple
  },
  {
    tag: "ChatGPT",
    description: "Explains AI chat models, ChatGPT applications, and usage.",
    color: "#D81B60", // Darker Pink
  },
  {
    tag: "Neural Networks",
    description:
      "Covers deep learning models and neural network architectures.",
    color: "#F57C00", // Darker Orange
  },

  // UI/UX & Design
  {
    tag: "UI/UX",
    description: "Covers user interface and user experience design principles.",
    color: "#1565C0", // Darker Blue
  },
  {
    tag: "User Experience",
    description: "Explains UX strategies for better user engagement.",
    color: "#00796B", // Darker Teal
  },
  {
    tag: "User Interface",
    description: "Covers UI design best practices, trends, and frameworks.",
    color: "#D32F2F", // Darker Red
  },
  {
    tag: "Design Trends",
    description: "Explores the latest design trends in tech.",
    color: "#FF8F00", // Darker Amber
  },
  {
    tag: "Figma",
    description: "Explains Figma tools, design workflows, and collaboration.",
    color: "#512DA8", // Darker Purple
  },
  {
    tag: "Prototyping",
    description: "Covers prototyping tools and techniques for UI/UX design.",
    color: "#C2185B", // Darker Pink
  },

  // Productivity & Career
  {
    tag: "Tech Career",
    description: "Covers career tips, job hunting, and tech industry insights.",
    color: "#0D47A1", // Darker Blue
  },
  {
    tag: "Freelancing",
    description:
      "Explains freelancing in the tech industry and client management.",
    color: "#558B2F", // Darker Green
  },
  {
    tag: "Remote Work",
    description: "Covers productivity and best practices for remote working.",
    color: "#E65100", // Darker Orange
  },
  {
    tag: "Productivity",
    description: "Explores tools and methods to enhance productivity.",
    color: "#4527A0", // Darker Purple
  },
  {
    tag: "Time Management",
    description: "Covers time management strategies for tech professionals.",
    color: "#01579B", // Darker Blue
  },
];
const ListOfTags = ({ searchQuery = "", addTagFromDropdown }) => {
  const filteredTags = techBlogTags.filter(({ tag }) =>
    tag.toLowerCase().includes(searchQuery)
  );
  return (
    <div>
      <div
        className={`absolute left-0 z-10 w-1/2 mt-1 overflow-auto bg-white rounded shadow-md top-full ${
          filteredTags.length > 4 ? "h-56" : "h-fit"
        } `}
      >
        {techBlogTags.some(({ tag }) =>
          tag.toLowerCase().includes(searchQuery.trim().toLowerCase())
        ) ? (
          <div>
            <div className="px-3 py-4 text-lg font-semibold border-b border-secondary">
              {" "}
              Top Tags{" "}
            </div>
            {filteredTags.map(({ tag, description, color }, index) => (
              <>
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => addTagFromDropdown({ tag, color })}
                  key={index}
                  className="px-4 py-2 hover:bg-secondary"
                >
                  <h3 className={`text-lg font-semibold `}># {tag}</h3>
                  <p className="break-words ">{description}</p>
                </div>
              </>
            ))}
          </div>
        ) : (
          <>
            <div
              onMouseDown={(e) => e.preventDefault()}
              onClick={() =>
                addTagFromDropdown({ tag: searchQuery, color: "#B1B1B1" })
              }
              className="flex items-center gap-2 px-4 py-2 hover:bg-secondary"
            >
              <p>#</p>
              <h3 className="text-lg font-semibold ">{searchQuery}</h3>
            </div>
          </>
        )}

        {}
      </div>
    </div>
  );
};

export default ListOfTags;
ListOfTags.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
