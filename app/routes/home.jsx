import { Welcome } from "../welcome/welcome";
import { Form, useNavigation } from "react-router";

export function meta() {
  return [
    { title: "Weather today " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
//for searching we use a get request
//for authentication we use a post request
export async function loader({ request }) {
  //when a submission is made, the loader will be called
  //the loader is called when the page is loaded, and the action is called when the form is submitted through the request
  //the request is the request object that is passed to the loader function
  console.log({ request });
  let url = new URL(request.url);
  //we setting the url variable to the request url
  //we passing the request url to the URL constructor to get the search params
  console.log({ url });
  let searchParams = url.searchParams;
  //we setting the searchParams variable to the search params of the url
  let city = searchParams.get("name") || "cairo";

  // creating a variable city to get the name from the search params with
  // if the name is not found, we set it to cairo (as default value)
  //.get helps to get the value of the search params with name prope

  // console.log({ city });
  if (!city) {
    throw new Response("City not found", { status: 404 });
  }
  // console.log({ url });
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=250b5d78bdb3551957a8e872ab1ca711&units=metric`
    );

    if (!res.ok) {
      throw new Response("City not found", { status: 404 });
    }
    // if (!res.ok) {
    //   throw new Response("City not found", { status: 404 });
    // }
    // console.log({ res });
    // return res.json(); // 🔁 this will be passed to `loaderData` on the next render

    let weather = await res.json();
    console.log({ weather });
    return weather;
  } catch (error) {
    // This catches network errors like no internet connection
    throw new Response("Please connect to a network", { status: 503 });
  }
}

export default function Home({ loaderData }) {
  // let loaderData = useLoaderData();
  // let actionData = useActionData();
  // let data = actionData || loaderData;
  // Object.entries(loaderData.main).map(([key, Value]) => {
  //   if (key === "temp") {
  //     console.log(`${key}: ${Value}`);
  //   }
  // });
  // using this way^ we need the Object.entries to loop through the object and an if stm for
  // // the key we want to get, but we can also use the loader.value to get the values
  // but a shorter way just have <p>Temperature: {loaderData.main.temp}</p>
  // maps dont work in objects,so can get values by loader.value needed
  //to loop through an object , use map then if its an array,
  let navigation = useNavigation();
  // console.log({ navigation });
  // navigation.state === "loading" ? <Welcome /> : null;
  // this will show the welcome component when the page is loading
  if (navigation.state === "loading") {
    return <Welcome />;
  }
  return (
    <div
      className={
        "min-h-screen $is bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white font-sans"
      }
    >
      <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-3xl overflow-hidden w-[800px] h-[400px] grid grid-cols-2 shadow-xl">
        {/* Left: Weather Overview */}
        <div
          className="p-10 flex flex-col justify-between bg-cover bg-center"
          style={{
            backgroundImage: `url('https://openweathermap.org/img/wn/${loaderData.weather[0].icon}@2x.png')`,
          }}
        >
          <div className="text-sm uppercase text-gray-300">the.weather</div>
          <div>
            <h2 className="text-5xl font-semibold">{loaderData.main.temp}</h2>
            <h3 className="text-2xl">{loaderData.name}</h3>
            <p className="text-sm text-gray-300 mt-2">
              {new Date(loaderData.dt).toString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {loaderData.weather[0].main}
            </p>
          </div>
        </div>

        {/* Right: Details Panel */}
        <div className="bg-black bg-opacity-50 p-8 relative">
          <label htmlFor="">
            {" "}
            <Form action="" method="GET" className="mb-4">
              {/* the get method  helps to make a request to a serve(others,request) 
              and its also a default value of forms*/}
              <input
                type="search"
                defaultValue={loaderData.name}
                aria-label="city name"
                placeholder="Another location"
                name="name"
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none"
              />
              <button
                type="submit"
                className="absolute top-8 right-10 text-orange-400 text-xl cursor-pointer"
              >
                🔍
              </button>
            </Form>
          </label>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>Birmingham</li>
            <li>Manchester</li>
            <li>New York</li>
            <li>California</li>
          </ul>

          <div className="mt-6 text-sm">
            <h4 className="text-gray-300 mb-2">Weather Details</h4>
            <p>{`cloudy ⛅: ${loaderData.clouds.all}%`}</p>
            <p>{`humidity : ${loaderData.main.humidity}%`}</p>
            <p>{`wind 💨 : ${loaderData.wind.speed}km/h`}</p>
            <p>{`temperature 🌡️ : ${loaderData.main.temp}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
