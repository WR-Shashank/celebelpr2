import React from 'react';

interface AppHeaderProps {
  appName: string;
  tagline: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ appName, tagline }) => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-indigo-100">
      <div className="container mx-auto max-w-6xl px-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black text-gray-900 tracking-tight">
            {appName}
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-lg mx-auto leading-relaxed">
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppHeader;