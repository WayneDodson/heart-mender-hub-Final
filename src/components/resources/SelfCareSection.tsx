
import React from 'react';

const SelfCareSection = () => {
  return (
    <section className="py-16 px-4 bg-healing-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-healing-800">Daily Self-Care Reminder</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-10">
            Remember that healing is not linear. Some days will be harder than others, 
            and that's okay. Be patient and gentle with yourself as you move through this process.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-healing-100">
            <h3 className="text-xl font-semibold mb-6 text-healing-700">Today's Affirmation</h3>
            <p className="text-xl italic leading-relaxed text-gray-700">
              "I am healing more each day. My worth is not defined by my past relationship, 
              but by the love and care I give myself now."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfCareSection;
