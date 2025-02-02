import React from "react";

function Footer() {
  return (
    <footer className="bg-primary text-white p-4 mt-auto flex flex-col items-center">
      <div className="flex items-center space-x-2">
        <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current">
          <path d="M22.672 15.226l-2.432.811..."></path>
        </svg>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </div>
      {/* <div className="flex space-x-4 mt-2">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
          </svg>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0..."></path>
          </svg>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955..."></path>
          </svg>
        </a>
      </div> */}
    </footer>
  );
}

export default Footer;
