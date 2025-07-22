import { Form, useActionData } from "react-router";

export async function action({ request }) {
  let formData = await request.formData();
  const name = formData.get("name");

  // Simulate saving data
  console.log("Received data:", { name });

  // Optionally redirect or return JSON
  return null; // or use redirect('/thank-you')
}

export function Card() {
  return (
    <form action="" className="mb-4">
      <input
        type="text"
        name="name"
        placeholder="Another location"
        className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none"
      />
      <button
        type="submit"
        className="absolute top-8 right-10 text-orange-400 text-xl cursor-pointer"
      ></button>
      <div>🔍</div>
    </form>
  );
}

export async function loader({ params }) {
  let cityId = params.id;
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=250b5d78bdb3551957a8e872ab1ca711&units=metric`
  );
  let weather = await res.json();
  return weather;
}
