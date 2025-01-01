import React from "react";
import Link from "next/link";

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <Link href="/news" className="nav-item">
        חדשות
      </Link>
      <Link href="/wizard" className="nav-item">
        שיחה
      </Link>
      <Link href="/report" className="nav-item">
        דיווח
      </Link>
    </nav>
  );
};

export default BottomNav;
