const Advert = () => {
  return (
    <div>
      <div className="p-4 border rounded-md shadow-md">
        <video
          autoPlay
          muted
          loop
          src="https://cdnl.iconscout.com/lottie/premium/thumb/ads-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--words-on-sign-board-signboard-pack-symbols-icons-8756161.mp4"
        ></video>

        <button
          onClick={() => (window.location.href = "mailto:uildari2@gmail.com")}
          className="w-full btn-primary"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Advert;
