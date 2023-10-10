import "./App.css"; // Import your global styles here

// Define your wrapper component
function Wrapper({ children }) {
  const wrapperStyles = {
    maxWidth: "1440px", // Set your desired maximum page width here
    margin: "0 auto", // Center the content horizontally
    padding: "20px", // Add padding for spacing

    // Add more global styles here
  };

  return <div style={wrapperStyles}>{children}</div>;
}

export default Wrapper;
