import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function FeatureCard({ title, description, emoji }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="flex flex-col items-center text-center p-8">
        <div className="text-4xl mb-4">{emoji}</div>
        <h3 className="font-semibold text-lg text-green-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <Button
          variant="outline"
          className="mt-4 rounded-full border-green-700 text-green-700 hover:bg-green-50"
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
