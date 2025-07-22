import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "Weather today " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export async function loader() {
  let res = await fetch(
    // `https://api.openweathermap.org/data/2.5/weather?lat=0.5143&lon=35.2698&appid=250b5d78bdb3551957a8e872ab1ca711`
    `https://api.openweathermap.org/data/2.5/weather?q=japan&appid=250b5d78bdb3551957a8e872ab1ca711&units=metric`
  );
  let weather = await res.json();
  console.log({ weather });
  return weather;
}

export default function Home({ loaderData }) {
  console.log(loaderData.main.temp);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white font-sans">
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
          <div className="mb-4">
            <input
              type="text"
              placeholder="Another location"
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-8 right-10 text-orange-400 text-xl cursor-pointer"
            >
              🔍
            </button>
          </div>

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
