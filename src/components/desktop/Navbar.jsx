const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between px-20 py-2 bg-gray-300 ">
        <h1 className="text-4xl font-semibold text-black">Harsh</h1>
        <div>
          <ul className="flex gap-4 text-lg font-semibold text-black">
            <li>
              <a href="/" className="hover:text-blue-500">
                home
              </a>
            </li>
            <li>
              <a href="/create" className="hover:text-blue-500">
                Create
              </a>
            </li>
            <li>
              <a href="/edit" className="hover:text-blue-500">
                Edit
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
