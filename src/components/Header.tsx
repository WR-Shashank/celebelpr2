import React from 'react';

interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-slate-800 mb-3">
            {title}
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;