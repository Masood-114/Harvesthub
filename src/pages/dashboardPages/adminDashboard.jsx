import { motion } from "framer-motion";
import { Users, ShoppingCart, Leaf, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductForm from "../../components/addProductForm";
import ConfirmDelete from "../../components/deleteConfirm";
import SuccessToast from "../../components/successToast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

import { fetchVeggies, deleteVeggie } from "../../features/veggieSlice";

const stats = [
  { title: "Total Products", value: "128", icon: <Leaf />, color: "bg-emerald-100 text-emerald-600" },
  { title: "Total Orders", value: "1,024", icon: <ShoppingCart />, color: "bg-blue-100 text-blue-600" },
  { title: "Users", value: "540", icon: <Users />, color: "bg-purple-100 text-purple-600" },
  { title: "Revenue", value: "$12,430", icon: <DollarSign />, color: "bg-orange-100 text-orange-600" },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { items, activeCategory } = useSelector((state) => state.veggies);

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchVeggies(activeCategory));
  }, [dispatch, activeCategory]);

  /* Pagination */
  const totalPages = Math.ceil(items.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentProducts = items.slice(start, start + perPage);

  /* Delete */
  const confirmDelete = () => {
    dispatch(deleteVeggie(deleteItem.idMeal));
    setDeleteItem(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <ConfirmDelete
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
      />

      <SuccessToast show={showToast} message="Product deleted successfully" />

      <div className="min-h-screen bg-slate-100 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-500">Manage products, users, and orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Products</h2>

            <Select
              value={String(perPage)}
              onValueChange={(v) => {
                setPerPage(Number(v));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 / page</SelectItem>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.idMeal}>
                  <TableCell>{product.idMeal}</TableCell>
                  <TableCell>{product.strMeal}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                      In Stock
                    </span>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditData(product);
                        setOpenForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteItem(product)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>

        <ProductForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          initialData={editData}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
