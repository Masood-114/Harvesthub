import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import SuccessToast from "./SuccessToast";

const ProductForm = ({ open, onClose, initialData, onSave }) => {
  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || "",
      stock: initialData?.stock || "",
      image: initialData?.image || "",
    },
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    form.reset({
      name: initialData?.name || "",
      price: initialData?.price || "",
      stock: initialData?.stock || "",
      image: initialData?.image || "",
    });
  }, [initialData, form]);

  const onSubmit = (data) => {
    onSave && onSave(data);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
    onClose();
  };

  return (
    <>
      <SuccessToast show={showToast} message="Product saved successfully!" />

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    {initialData ? "Edit Product" : "Add Product"}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X />
                  </Button>
                </div>

                {/* Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Tomato" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price & Stock */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        rules={{
                          required: "Price required",
                          min: { value: 0, message: "Price must be >= 0" },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stock"
                        rules={{
                          required: "Stock required",
                          min: { value: 0, message: "Stock must be >= 0" },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Image */}
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        className={`bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all `}
                        type="submit"
                      >
                        {initialData ? "Update" : "Add"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductForm;
