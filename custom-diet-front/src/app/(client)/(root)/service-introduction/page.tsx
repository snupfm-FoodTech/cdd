'use client';

const ServiceIntroduction = () => {
  const envService = process.env.NEXT_PUBLIC_CD_SERVICE;
  if (!envService) return null;

  return (
    <div>
      <iframe
        src={envService}
        title="Service Introduction"
        className="fixed left-0 top-0 h-full w-full border-0 pt-[64px]"
      />
    </div>
  );
};

export default ServiceIntroduction;
