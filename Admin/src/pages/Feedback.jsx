import { useNavigate } from "react-router-dom";
import { CardHoverEffectDemo } from "../components/Cards";
import { getToken } from "../utils/getToken";
import Sidebar from "./sidebar";
import { useFeedback } from "../hooks/useFeedback";

const Feedback = () => {
  const token = getToken();
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }

  const { loading, feedbacks } = useFeedback();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const projects = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Meta",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
    },
    {
      title: "Microsoft",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
    },
  ];

  return (
    <div>
      <CardHoverEffectDemo data={projects} />
    </div>
  );
};

export default Feedback;
