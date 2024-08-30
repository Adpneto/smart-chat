import { useCardData } from "@/components/constants/lists";
import UsersCharts from "./users-charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import UsersCharts2 from "./users-charts2";

export default function Dashboard() {

  const cards = useCardData()

  return (
    <div className="my-2 space-y-2 mx-2">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {cards.map((cards, index) => (
          <Card key={index}>
            <CardContent className="flex justify-center items-center mt-8">
              <cards.icon size={cards.iconSize}/>
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center">
              <CardTitle>{cards.count}{cards.title}</CardTitle>
              <CardDescription>{cards.description}</CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
      <UsersCharts />
      <UsersCharts2 />
    </div>
  )
}
