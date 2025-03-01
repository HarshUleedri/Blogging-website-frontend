const NotFound = () => {
  return (
    <div>
      <div className="flex justify-center item-center">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <a className="px-4 py-1 text-white bg-gray-600 cursor-pointer" href="/">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
