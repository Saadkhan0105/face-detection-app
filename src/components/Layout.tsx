import React, { ReactNode } from "react";
import "../App.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Face Detection App</h1>
      </header>

      <main className="app-main container">{children}</main>

      <footer className="app-footer">
        <p>&copy; 2025 Face Detection. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
