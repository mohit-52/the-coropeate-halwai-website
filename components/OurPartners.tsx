'use client';

import React from "react";
import { motion } from "motion/react";

function PartnerItem({ partner }: { partner: { name: string; logoUrl: string } }) {
  const [error, setError] = React.useState(false);
  return (
    <div className="flex items-center justify-center transition-all duration-300 h-16 min-w-max px-4">
      {!error && partner.logoUrl ? (
        <img
          src={partner.logoUrl}
          alt={partner.name}
          className="max-h-10 max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-[#052316]/40 font-sans font-bold text-xl md:text-2xl uppercase tracking-wider transition-colors duration-300 hover:text-[#b89547] whitespace-nowrap">
          {partner.name}
        </span>
      )}
    </div>
  );
}

export default function OurPartners() {
  const partners = [
    { name: "Reliance Retail", logoUrl: "https://logo.clearbit.com/relianceretail.com" },
    { name: "Google Cloud", logoUrl: "https://logo.clearbit.com/cloud.google.com" },
    { name: "Inmobi", logoUrl: "https://logo.clearbit.com/inmobi.com" },
    { name: "Razorpay", logoUrl: "https://logo.clearbit.com/razorpay.com" },
    { name: "Amazon", logoUrl: "https://logo.clearbit.com/amazon.in" },
    { name: "Deloitte", logoUrl: "https://logo.clearbit.com/deloitte.com" },
    { name: "Accenture", logoUrl: "https://logo.clearbit.com/accenture.com" },
    { name: "Microsoft", logoUrl: "https://logo.clearbit.com/microsoft.com" },
    { name: "Tata Consultancy Services", logoUrl: "https://logo.clearbit.com/tcs.com" },
    { name: "Infosys", logoUrl: "https://logo.clearbit.com/infosys.com" }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 bg-white border-b border-[#e5dfd3]/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-6 h-[1px] bg-[#b89547]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#b89547] uppercase">Trusted By Industry Leaders</span>
            <div className="w-6 h-[1px] bg-[#b89547]" />
          </div>
          <h3 className="text-3xl font-serif font-black text-[#052316] tracking-tight">
            Our Esteemed Clients
          </h3>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Marquee container */}
        <div className="flex w-max animate-marquee space-x-12 md:space-x-20 px-6">
          {/* First set of partners */}
          <div className="flex items-center space-x-12 md:space-x-20">
            {partners.map((partner, index) => (
              <PartnerItem key={index} partner={partner} />
            ))}
          </div>
          {/* Second set of partners for seamless looping */}
          <div className="flex items-center space-x-12 md:space-x-20" aria-hidden="true">
            {partners.map((partner, index) => (
              <PartnerItem key={index} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
