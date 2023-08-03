import { useState, useEffect } from "react";
import React from "react";

const socket = new WebSocket(process.env.GATSBY_WS_ENDPOINT);

export default function Nmap(props) {
  const [isConnected, setIsConnected] = useState(false);
  const [response, setResponse] = useState([]);
  const [toolWorking, setToolWorking] = useState(false);

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      setIsConnected(true);
    });

    socket.addEventListener("close", (event) => {
      setIsConnected(false);
    });

    socket.addEventListener("message", (event) => {
      const eventData = JSON.parse(event.data);

      if (eventData["status"] === "running") {
        setToolWorking(true)
      }

      if (eventData["status"] === "done") {
        setToolWorking(false)
      }

      setResponse((d) => [...d, eventData["raw"]]);

      console.log(event.data);
    });
  }, [response]);

  const runNmap = async () => {
    try {
      const response = await fetch(`${process.env.GATSBY_API_URL}nmap?ip=127.0.0.1&mode=quick&session=securetoken`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className="m-6 max-w-sm transition duration-500 hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-fullDark dark:hover:shadow-fullLight dark:border-white h-full block p-6 bg-white border border-black  hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700">
        <div className="flex w-full justify-end">
          {isConnected ? (
            <button
              onClick={runNmap}
              className="inline-flex hover:bg-white shadow-md absolute border border-black p-1"
            >
              Run Live
              {toolWorking && (
                <svg
                  className="animate-spin ml-1 mr-1 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </button>
          ) : (
            <button className="hover:bg-white shadow-md absolute border border-black p-1">
              Schedule
            </button>
          )}
        </div>

        <h5 className="break-words mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Port Scanner: Nmap
        </h5>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Part of the <strong>Recon</strong> Phase. Portscanning classifies as{" "}
          <strong>active</strong>, meaning your target will know the IP you are
          coming from.
        </p>

        <div className="bottom-0 left-0 text-black text-lg font-semibold mt-2">
          Options &gt;
        </div>

        <div>
          <input
            placeholder="127"
            className="w-10"
            type="number"
            min="1"
            max="255"
          />
          .
          <input
            placeholder="0"
            className="w-10"
            type="number"
            min="0"
            max="255"
          />
          .
          <input
            placeholder="0"
            className="w-10"
            type="number"
            min="0"
            max="255"
          />
          .
          <input
            placeholder="1"
            className="w-10"
            type="number"
            min="0"
            max="255"
          />
          <br />
          <input type="number" placeholder="quick" min="0" max="65535" />
          <br />
          <ul className="mt-2 items-center w-full text-sm font-medium text-gray-900 bg-white  border border-black sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id="vue-checkbox-list"
                  type="checkbox"
                  value=""
                  className="accent-black border-black w-4 h-4 text-black bg-gray-100 focus:ring-black dark:focus:ring-white dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="vue-checkbox-list"
                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Force
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id="react-checkbox-list"
                  type="checkbox"
                  value=""
                  className="accent-black border-black w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="react-checkbox-list"
                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Service
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id="angular-checkbox-list"
                  type="checkbox"
                  value=""
                  className="accent-black border-black w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="angular-checkbox-list"
                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Stealth
                </label>
              </div>
            </li>
            <li className="w-full dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id="laravel-checkbox-list"
                  type="checkbox"
                  value=""
                  className="accent-black border-black w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="laravel-checkbox-list"
                  className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Script
                </label>
              </div>
            </li>
          </ul>
        </div>

        {response.length > 0 && (
          <div className="bg-white border border-black mt-4 overflow-auto h-80">
            <pre className="text-black">{response}</pre>
          </div>
        )}
      </div>
    </>
  );
}
