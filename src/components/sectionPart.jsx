const SectionPart = ({ children, className = "" }) => {
  return (
    <section className={`relative mx-auto max-w-7xl px-6 pt-12 ${className}`}>
      {children}
    </section>
  );
};

export default SectionPart;
