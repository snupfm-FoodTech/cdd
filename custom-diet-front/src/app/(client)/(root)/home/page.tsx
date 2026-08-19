'use client';
import SectionBanner from './components/section-banner';
// import SectionCompany from './components/section-company';
import SectionFrequentlyUsedServices from './components/section-frequently-services';
// import SectionKnowledge from './components/section-knowledge';
import SectionNotices from './components/section-notices';

const Homepage = () => {
  return (
    <>
      <SectionBanner />
      <div className="border-none bg-primary-foreground pb-section">
        <div className="section-padding pt-4">
          <SectionFrequentlyUsedServices />
        </div>

        <div className="section-padding mt-4">
          <div className="w-full">
            <SectionNotices />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
