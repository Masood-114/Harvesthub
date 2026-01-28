import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { clearMeal, fetchProductDetail } from "../features/proDetailSlice";

function MealPopup({ idMeal }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { meal, status } = useSelector((state) => state.detailPro);

  // fetch details only when modal opens
  useEffect(() => {
    if (open) {
      dispatch(fetchProductDetail(idMeal));
    } else {
      dispatch(clearMeal());
    }
  }, [open, idMeal, dispatch]);

  // collect ingredients safely
  const ingredients = useMemo(() => {
    if (!meal) return [];
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .map((i) => {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        return ing ? `${ing} - ${measure}` : null;
      })
      .filter(Boolean);
  }, [meal]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Meal Details</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl p-0">
        {status === "loading" && (
          <div className="p-10 text-center">Loading...</div>
        )}

        {status === "success" && meal && (
          <>
            <DialogHeader className="p-6 border-b">
              <DialogTitle className="text-2xl">{meal.strMeal}</DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-[80vh]">
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="rounded-xl w-full"
                />

                <div>
                  <p>
                    <strong>Category:</strong> {meal.strCategory}
                  </p>
                  <p>
                    <strong>Area:</strong> {meal.strArea}
                  </p>

                  <h3 className="mt-4 font-semibold">Ingredients</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t">
                <h3 className="font-semibold mb-2">Instructions</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {meal.strInstructions}
                </p>
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default MealPopup;
