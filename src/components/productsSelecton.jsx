const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse"
        >
          {/* Image */}
          <div className="h-40 w-50 bg-slate-200" />

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="h-4  bg-slate-200 rounded w-5" />
            <div className="h-3 bg-slate-200 rounded w-2" />

            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-slate-200 rounded w-2" />
              <div className="h-8 w-8 bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
