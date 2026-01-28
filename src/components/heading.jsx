const Heading = ({ firTxt, secTxt, className = "" }) => {
  return (
    <h1 className={`font-bold tracking-tight text-slate-900 ${className} `}>
      {firTxt}
      <span className="text-emerald-600">{secTxt}</span>
    </h1>
  );
};

export default Heading;
