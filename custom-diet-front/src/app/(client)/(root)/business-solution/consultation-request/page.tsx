'use client';

const ConsultationRequestPage = () => {
  const envService = process.env.NEXT_PUBLIC_CD_SERVICE;
  if (!envService) return null;

  return (
    <div>
      <iframe
        src={`${envService}/consultation.html`}
        title="Consultation Request"
        className="fixed left-0 top-0 h-full w-full border-0 pt-[64px]"
      />
    </div>
  );
};

export default ConsultationRequestPage;
