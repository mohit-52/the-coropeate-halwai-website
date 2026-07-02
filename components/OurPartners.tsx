'use client';

import React from "react";
import { motion } from "motion/react";

function PartnerItem({ partner }: { partner: { name: string; logoUrl: string } }) {
  const [error, setError] = React.useState(false);
  return (
    <div className="flex items-center justify-center h-16 min-w-max px-4">
      {!error && partner.logoUrl ? (
        <img
          src={partner.logoUrl}
          alt={partner.name}
          className="max-h-10 max-w-[140px] object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-[#052316]/40 font-sans font-bold text-xl md:text-2xl uppercase tracking-wider whitespace-nowrap">
          {partner.name}
        </span>
      )}
    </div>
  );
}

export default function OurPartners() {
  const partners = [
    { name: "Reliance Retail", logoUrl: "https://www.google.com/s2/favicons?domain=relianceretail.com&sz=128" },
    { name: "Google Cloud", logoUrl: "https://www.google.com/s2/favicons?domain=cloud.google.com&sz=128" },
    { name: "InMobi", logoUrl: "https://www.google.com/s2/favicons?domain=inmobi.com&sz=128" },
    { name: "Razorpay", logoUrl: "https://www.google.com/s2/favicons?domain=razorpay.com&sz=128" },
    { name: "Amazon", logoUrl: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128" },
    { name: "Deloitte", logoUrl: "https://www.google.com/s2/favicons?domain=deloitte.com&sz=128" },
    { name: "Accenture", logoUrl: "https://www.google.com/s2/favicons?domain=accenture.com&sz=128" },
    { name: "Microsoft", logoUrl: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128" },
    { name: "Tata Consultancy Services", logoUrl: "https://www.google.com/s2/favicons?domain=tcs.com&sz=128" },
    { name: "Infosys", logoUrl: "https://www.google.com/s2/favicons?domain=infosys.com&sz=128" }
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
        <div className="flex w-max animate-marquee">
          {/* First set of partners */}
          <div className="flex items-center space-x-12 md:space-x-20 pr-12 md:pr-20">
            {partners.map((partner, index) => (
              <PartnerItem key={index} partner={partner} />
            ))}
          </div>
          {/* Second set of partners for seamless looping */}
          <div className="flex items-center space-x-12 md:space-x-20 pr-12 md:pr-20" aria-hidden="true">
            {partners.map((partner, index) => (
              <PartnerItem key={index} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
