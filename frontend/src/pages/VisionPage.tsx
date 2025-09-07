import React from 'react';

const VisionSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Golden Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-3xl font-bold text-white transform -rotate-12">Z</span>
          </div>
        </div>

        {/* Vision 2025 Title */}
        <h2 className="text-5xl font-bold text-gray-900 mb-12">Vision 2025</h2>

        {/* Mission Statement */}
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Technology is reshaping the world at an unprecedented pace. But in Pakistan, the 
          gap between innovation and accessibility still exists. At ZERO, we see this not as a 
          challenge, but as an opportunity—to push boundaries, rethink possibilities, and 
          bring world-class technology within reach.
        </p>
      </div>
    </section>
  );
};

export default VisionSection;